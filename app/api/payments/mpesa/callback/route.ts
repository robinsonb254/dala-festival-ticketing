import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";
import { queryMpesaStk } from "@/lib/server/payments";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const payload = await request.json();
    const callback = payload?.Body?.stkCallback;
    const checkoutId = callback?.CheckoutRequestID;
    if (!checkoutId) return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

    const { data: order } = await supabaseAdmin.from("ticket_orders")
      .select("id, amount_kes, phone, payment_status, checkout_request_id")
      .eq("checkout_request_id", checkoutId).maybeSingle();
    if (!order || order.payment_status === "paid") return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

    // A callback alone is not trusted as proof of payment. Query Daraja independently.
    const verification = await queryMpesaStk(checkoutId);
    // Only the server-to-server Daraja query may determine the transaction result.
    // Callback result codes are not independently authenticated.
    const resultCode = String(verification.ResultCode ?? "");
    if (resultCode === "0") {
      // Daraja's STK query confirms success, while the callback metadata carries
      // the receipt, amount and payer number. Require all three and compare them
      // with the saved order before marking it paid.
      const metadata = callback.CallbackMetadata?.Item || [];
      const valueOf = (name: string) => metadata.find((item: any) => item.Name === name)?.Value;
      const receipt = String(valueOf("MpesaReceiptNumber") || "");
      const amount = Number(valueOf("Amount"));
      const phone = String(valueOf("PhoneNumber") || "");
      if (receipt && Number.isFinite(amount) && amount === Number(order.amount_kes) &&
          phone && phone === order.phone) {
        const { error: paidError } = await supabaseAdmin.from("ticket_orders").update({
          payment_status: "paid",
          mpesa_receipt_number: receipt,
          paid_at: new Date().toISOString(),
        }).eq("id", order.id).eq("payment_status", "pending");
        if (paidError) throw paidError;
      } else {
        console.error("M-Pesa success query did not include matching callback metadata:", {
          orderReference: order.id, hasReceipt: Boolean(receipt), amountMatches: amount === Number(order.amount_kes),
          phoneMatches: phone === order.phone,
        });
      }
    } else if (verification.ResultCode !== undefined && resultCode !== "0") {
      await supabaseAdmin.from("ticket_orders").update({ payment_status: "failed" })
        .eq("id", order.id).eq("payment_status", "pending");
    }
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("M-Pesa callback verification error:", error);
    // Acknowledge delivery so Safaricom does not repeatedly retry an invalid callback.
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Received" });
  }
}
