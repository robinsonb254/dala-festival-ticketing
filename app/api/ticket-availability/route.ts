import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/server/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("ticket_availability_cycles")
      .select("ticket_type, cycle_progress, starts_at, ends_at");
    if (error) throw error;

    const now = Date.now();
    const rows = data || [];
    const offerTypes = ["Regular", "VIP", "VVIP"];
    const active = rows.length === 3 && offerTypes.every((type) => rows.some((row) => row.ticket_type === type)) && rows.every((row) =>
      now >= Date.parse(row.starts_at) && now < Date.parse(row.ends_at)
    );
    const availability = active
      ? Object.fromEntries(rows.map((row) => [row.ticket_type, 3 - Number(row.cycle_progress)]))
      : {};

    return NextResponse.json(
      { active, availability },
      { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
    );
  } catch (error) {
    console.error("Ticket availability lookup failed:", error);
    return NextResponse.json(
      { error: "Ticket availability is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
