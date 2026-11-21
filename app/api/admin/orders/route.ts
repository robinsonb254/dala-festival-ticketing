import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });

  try {
    const supabase = getSupabaseAdmin();
    const pageSize = 1000;
    let offset = 0;
    const allOrders: Array<{
      ticket_type: string;
      quantity: number;
      amount_kes: number;
      payment_status: string | null;
      payment_provider: string | null;
    }> = [];

    // Read every order in pages so dashboard totals are all-time, not limited to the table view.
    while (true) {
      const { data, error } = await supabase
        .from("ticket_orders")
        .select("ticket_type, quantity, amount_kes, payment_status, payment_provider")
        .order("created_at", { ascending: false })
        .range(offset, offset + pageSize - 1);
      if (error) throw error;
      const batch = data || [];
      allOrders.push(...batch);
      if (batch.length < pageSize) break;
      offset += batch.length;
    }

    const { data: recentOrders, error: recentError } = await supabase
      .from("ticket_orders")
      .select("order_reference, customer_name, email, phone, ticket_type, quantity, amount_kes, payment_status, payment_provider, mpesa_receipt_number, paypal_order_id, created_at, paid_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (recentError) throw recentError;

    const paid = allOrders.filter((order) => order.payment_status === "paid");
    const revenueKes = paid.reduce((sum, order) => sum + Number(order.amount_kes || 0), 0);
    const totalTicketsSold = paid.reduce((sum, order) => sum + Number(order.quantity || 0), 0);
    const countStatus = (status: string) => allOrders.filter((order) => order.payment_status === status).length;

    const ticketSales = ["Regular", "VIP", "VVIP", "Table of 4", "Table of 8"].map((ticketType) => {
      const matching = paid.filter((order) => order.ticket_type === ticketType);
      return {
        ticketType,
        quantity: matching.reduce((sum, order) => sum + Number(order.quantity || 0), 0),
        revenueKes: matching.reduce((sum, order) => sum + Number(order.amount_kes || 0), 0),
      };
    });

    const providers = ["mpesa", "paypal"].map((provider) => {
      const matching = paid.filter((order) => order.payment_provider === provider);
      return {
        provider,
        paidOrders: matching.length,
        revenueKes: matching.reduce((sum, order) => sum + Number(order.amount_kes || 0), 0),
      };
    });

    const response = NextResponse.json({
      summary: {
        totalOrders: allOrders.length,
        paidOrders: paid.length,
        pendingOrders: countStatus("pending"),
        failedOrders: countStatus("failed"),
        totalTicketsSold,
        revenueKes,
      },
      providers,
      ticketSales,
      orders: recentOrders || [],
    });
    response.headers.set("Cache-Control", "no-store, private");
    return response;
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json({ error: "Unable to load ticket orders." }, { status: 500 });
  }
}
