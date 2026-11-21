import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ reference: string }> }) {
  const { reference } = await context.params;
  if (!/^DALA-[A-F0-9-]{36}$/.test(reference)) return NextResponse.json({ error: "Invalid order reference." }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("ticket_orders")
    .select("order_reference, ticket_type, quantity, amount_kes, payment_status, payment_provider, mpesa_receipt_number, created_at, paid_at")
    .eq("order_reference", reference).maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to check order status." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order: data });
}
