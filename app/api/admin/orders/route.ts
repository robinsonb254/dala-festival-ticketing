import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("ticket_orders")
      .select("order_reference, customer_name, email, phone, ticket_type, quantity, amount_kes, payment_status, payment_provider, mpesa_receipt_number, paypal_order_id, created_at, paid_at")
      .order("created_at", { ascending: false }).limit(1000);
    if (error) throw error;
    const orders = data || [];
    const paid = orders.filter(o => o.payment_status === "paid");
    const total = paid.reduce((sum, o) => sum + Number(o.amount_kes || 0), 0);
    const byStatus = (status: string) => orders.filter(o => o.payment_status === status).length;
    const ticketSales = ["Regular", "VIP", "VVIP", "Table of 4", "Table of 8"].map(type => ({
      ticketType: type,
      quantity: paid.filter(o => o.ticket_type === type).reduce((sum, o) => sum + Number(o.quantity || 0), 0),
      revenueKes: paid.filter(o => o.ticket_type === type).reduce((sum, o) => sum + Number(o.amount_kes || 0), 0),
    }));
    const payload = {
      summary: { totalOrders: orders.length, paidOrders: paid.length, pendingOrders: byStatus("pending"), failedOrders: byStatus("failed"), revenueKes: total },
      providers: ["mpesa", "paypal"].map(provider => ({ provider, paidOrders: paid.filter(o => o.payment_provider === provider).length, revenueKes: paid.filter(o => o.payment_provider === provider).reduce((sum, o) => sum + Number(o.amount_kes || 0), 0) })),
      ticketSales, orders,
    };
    const response = NextResponse.json(payload);
    response.headers.set("Cache-Control", "no-store, private");
    return response;
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json({ error: "Unable to load ticket orders." }, { status: 500 });
  }
}
