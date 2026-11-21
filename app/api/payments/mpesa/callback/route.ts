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
    const resultCode = String(verification.ResultCode ?? callback.ResultCode ?? "");
    if (resultCode === "0") {
      const metadata = callback.CallbackMetadata?.Item || [];
      const receiptFromCallback = metadata.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value;
      const receipt = String(receiptFromCallback || "");
      const amountFromCallback = Number(metadata.find((item: any) => item.Name === "Amount")?.Value);
      const phoneFromCallback = String(metadata.find((item: any) => item.Name === "PhoneNumber")?.Value || "");
      const verifiedAmount = Number(verification.Amount ?? amountFromCallback);
      const verifiedPhone = String(verification.PhoneNumber ?? phoneFromCallback);
      const verifiedReceipt = String(verification.MpesaReceiptNumber ?? receipt);
      if (verifiedAmount === order.amount_kes && verifiedPhone === order.phone && verifiedReceipt) {
        await supabaseAdmin.from("ticket_orders").update({
          payment_status: "paid", mpesa_receipt_number: verifiedReceipt, paid_at: new Date().toISOString(),
        }).eq("id", order.id).eq("payment_status", "pending");
      }
    } else if (callback.ResultCode !== undefined && String(callback.ResultCode) !== "0") {
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
