import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";
import { TICKET_PRICES, makeOrderReference, normalizeKenyanPhone } from "@/lib/server/tickets";
import { createPaypalOrder, initiateMpesaStk } from "@/lib/server/payments";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await request.json();
    const customerName = String(body.customerName || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 254) || null;
    const ticketType = String(body.ticketType || "");
    const quantity = Number(body.quantity);
    const paymentProvider = String(body.paymentProvider || "");
    const termsAccepted = body.termsAccepted === true;
    if (customerName.length < 2) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
    if (!termsAccepted) return NextResponse.json({ error: "Please accept the Terms & Conditions before continuing." }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return NextResponse.json({ error: "Ticket quantity must be between 1 and 10." }, { status: 400 });
    if (!Object.hasOwn(TICKET_PRICES, ticketType)) return NextResponse.json({ error: "Choose a valid ticket category." }, { status: 400 });
    if (!["mpesa", "paypal"].includes(paymentProvider)) return NextResponse.json({ error: "Choose M-Pesa or PayPal." }, { status: 400 });
    let phone: string | null = null;
    if (paymentProvider === "mpesa") {
      try { phone = normalizeKenyanPhone(String(body.phone || "")); }
      catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid phone number." }, { status: 400 }); }
    }

    if (paymentProvider === "mpesa") {
      const mpesaPhone = phone;
      if (!mpesaPhone) return NextResponse.json({ error: "Enter your M-Pesa phone number." }, { status: 400 });
      const preparationCutoff = new Date(Date.now() - 30 * 1000).toISOString();
      const recentCutoff = new Date(Date.now() - 5 * 60 * 1000).toISOString();

      // A request that never received a Daraja CheckoutRequestID is a failed
      // preparation, not an active customer prompt. Release it after 30 seconds.
      const { error: expirePreparationError } = await supabaseAdmin.from("ticket_orders")
        .update({ payment_status: "failed" })
        .eq("phone", phone)
        .eq("payment_provider", "mpesa")
        .eq("payment_status", "pending")
        .is("checkout_request_id", null)
        .lt("created_at", preparationCutoff);
      if (expirePreparationError) throw expirePreparationError;

      // Expire abandoned prompts before checking for an active order. A partial
      // unique index in the Supabase migration below makes this reservation atomic.
      const { error: expireError } = await supabaseAdmin.from("ticket_orders")
        .update({ payment_status: "failed" })
        .eq("phone", phone)
        .eq("payment_provider", "mpesa")
        .eq("payment_status", "pending")
        .lt("created_at", recentCutoff);
      if (expireError) throw expireError;
      const { data: activeOrder, error: activeOrderError } = await supabaseAdmin
        .from("ticket_orders")
        .select("order_reference, checkout_request_id, ticket_type, quantity")
        .eq("phone", phone)
        .eq("payment_provider", "mpesa")
        .eq("payment_status", "pending")
        .gte("created_at", recentCutoff)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (activeOrderError) throw activeOrderError;
      if (activeOrder) {
        const sameSelection = activeOrder.ticket_type === ticketType && Number(activeOrder.quantity) === quantity;
        if (!sameSelection) {
          return NextResponse.json(
            { error: "Another M-Pesa checkout is already pending for this phone number. Complete that payment or wait for its status before starting a different order." },
            { status: 409 }
          );
        }
        if (!activeOrder.checkout_request_id) {
          return NextResponse.json(
            { error: "Your M-Pesa checkout is already being prepared. Wait a moment and check your phone before trying again." },
            { status: 409 }
          );
        }
        return NextResponse.json({
          ok: true,
          provider: "mpesa",
          reference: activeOrder.order_reference,
          message: "An M-Pesa request is already active for this order. Complete the prompt already sent to your phone. Do not request or pay again.",
        });
      }
    }

    const amountKes = TICKET_PRICES[ticketType] * quantity;
    const orderReference = makeOrderReference();
    const { data: order, error: insertError } = await supabaseAdmin
      .from("ticket_orders")
      .insert({
        order_reference: orderReference, customer_name: customerName, email, phone,
        ticket_type: ticketType, quantity, amount_kes: amountKes,
        payment_status: "pending", payment_provider: paymentProvider,
        terms_accepted_at: new Date().toISOString(), terms_version: "2026-11-21",
      })
      .select("order_reference")
      .single();
    if (insertError?.code === "23505" && paymentProvider === "mpesa") {
      return NextResponse.json(
        { error: "An M-Pesa checkout is already active for this phone number. Complete that payment or check its status before trying again." },
        { status: 409 }
      );
    }
    if (insertError || !order) throw new Error("We could not create your order. Please try again.");

    if (paymentProvider === "mpesa") {
      try {
        const stk = await initiateMpesaStk({ phone: mpesaPhone, amount: amountKes, orderReference });
        const { error: updateError } = await supabaseAdmin.from("ticket_orders").update({
          checkout_request_id: stk.CheckoutRequestID,
          merchant_request_id: stk.MerchantRequestID,
        }).eq("order_reference", orderReference);
        if (updateError) throw new Error("M-Pesa was started, but the order could not be updated. Contact support with reference " + orderReference + ".");
        return NextResponse.json({ ok: true, provider: "mpesa", reference: orderReference, message: stk.CustomerMessage || "Check your phone and enter your M-Pesa PIN to complete payment." });
      } catch (error) {
        const { error: failError } = await supabaseAdmin.from("ticket_orders").update({ payment_status: "failed" })
          .eq("order_reference", orderReference).eq("payment_status", "pending");
        if (failError) console.error("Unable to expire failed M-Pesa checkout:", failError);
        throw error;
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const paypal = await createPaypalOrder({ amountKes, orderReference, siteUrl, landingPage: "GUEST_CHECKOUT" });
    const { error: updateError } = await supabaseAdmin.from("ticket_orders").update({
      paypal_order_id: paypal.id,
      paypal_amount_usd: paypal.usdAmount,
    }).eq("order_reference", orderReference);
    if (updateError) throw new Error("PayPal was prepared, but the order could not be updated. Contact support with reference " + orderReference + ".");
    return NextResponse.json({ ok: true, provider: "paypal", reference: orderReference, approvalUrl: paypal.approvalUrl, currency: "USD", amount: paypal.usdAmount });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout could not be started." }, { status: 500 });
  }
}
