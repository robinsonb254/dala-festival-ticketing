import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { capturePaypalOrder } from "@/lib/server/payments";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { reference, paypalOrderId } = await request.json();
    if (typeof reference !== "string" || typeof paypalOrderId !== "string") {
      return NextResponse.json({ error: "Missing PayPal order details." }, { status: 400 });
    }
    const { data: order, error } = await supabaseAdmin.from("ticket_orders")
      .select("id, order_reference, amount_kes, payment_status, payment_provider, paypal_order_id")
      .eq("order_reference", reference).maybeSingle();
    if (error || !order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    if (order.payment_provider !== "paypal" || order.paypal_order_id !== paypalOrderId) {
      return NextResponse.json({ error: "PayPal order does not match this ticket order." }, { status: 400 });
    }
    if (order.payment_status === "paid") return NextResponse.json({ ok: true, status: "paid", reference });

    const capture = await capturePaypalOrder(paypalOrderId);
    const unit = capture.purchase_units?.[0];
    const captureRecord = unit?.payments?.captures?.[0];
    const rate = Number(process.env.PAYPAL_KES_TO_USD_RATE);
    const expectedUsd = (order.amount_kes / rate).toFixed(2);
    const capturedAmount = Number(captureRecord?.amount?.value);
    const customReference = unit?.custom_id || unit?.invoice_id;
    if (capture.status !== "COMPLETED" || captureRecord?.status !== "COMPLETED" ||
        captureRecord?.amount?.currency_code !== "USD" ||
        capturedAmount.toFixed(2) !== expectedUsd || customReference !== reference) {
      return NextResponse.json({ error: "PayPal payment could not be verified against this order." }, { status: 402 });
    }
    const { error: updateError } = await supabaseAdmin.from("ticket_orders").update({
      payment_status: "paid", paypal_capture_id: captureRecord.id, paid_at: new Date().toISOString(),
    }).eq("id", order.id).eq("payment_status", "pending");
    if (updateError) throw new Error("Payment was captured but order confirmation needs review. Contact support with " + reference + ".");
    return NextResponse.json({ ok: true, status: "paid", reference });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "PayPal payment could not be confirmed." }, { status: 500 });
  }
}
