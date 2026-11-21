import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { TICKET_PRICES, makeOrderReference, normalizeKenyanPhone } from "@/lib/server/tickets";
import { createPaypalOrder, initiateMpesaStk } from "@/lib/server/payments";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customerName = String(body.customerName || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 254) || null;
    const ticketType = String(body.ticketType || "");
    const quantity = Number(body.quantity);
    const paymentProvider = String(body.paymentProvider || "");
    if (customerName.length < 2) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return NextResponse.json({ error: "Ticket quantity must be between 1 and 10." }, { status: 400 });
    if (!(ticketType in TICKET_PRICES)) return NextResponse.json({ error: "Choose a valid ticket category." }, { status: 400 });
    if (!["mpesa", "paypal"].includes(paymentProvider)) return NextResponse.json({ error: "Choose M-Pesa or PayPal." }, { status: 400 });
    let phone: string;
    try { phone = normalizeKenyanPhone(String(body.phone || "")); }
    catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid phone number." }, { status: 400 }); }

    const amountKes = TICKET_PRICES[ticketType] * quantity;
    const orderReference = makeOrderReference();
    const { data: order, error: insertError } = await supabaseAdmin
      .from("ticket_orders")
      .insert({
        order_reference: orderReference, customer_name: customerName, email, phone,
        ticket_type: ticketType, quantity, amount_kes: amountKes,
        payment_status: "pending", payment_provider: paymentProvider,
      })
      .select("order_reference")
      .single();
    if (insertError || !order) throw new Error("We could not create your order. Please try again.");

    if (paymentProvider === "mpesa") {
      const stk = await initiateMpesaStk({ phone, amount: amountKes, orderReference });
      const { error: updateError } = await supabaseAdmin.from("ticket_orders").update({
        checkout_request_id: stk.CheckoutRequestID,
        merchant_request_id: stk.MerchantRequestID,
      }).eq("order_reference", orderReference);
      if (updateError) throw new Error("M-Pesa was started, but the order could not be updated. Contact support with reference " + orderReference + ".");
      return NextResponse.json({ ok: true, provider: "mpesa", reference: orderReference, message: stk.CustomerMessage || "Check your phone and enter your M-Pesa PIN to complete payment." });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const paypal = await createPaypalOrder({ amountKes, orderReference, siteUrl });
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
