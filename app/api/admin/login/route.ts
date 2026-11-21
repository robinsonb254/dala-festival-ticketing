import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, credentialsMatch, ADMIN_COOKIE } from "@/lib/server/admin-auth";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").slice(0, 254);
    const password = String(body.password || "").slice(0, 256);
    if (!credentialsMatch(email, password)) {
      return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    }
    const session = createAdminSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, session.value, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "strict", path: "/", maxAge: session.maxAge,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ error: "Administrator sign-in is not configured." }, { status: 503 });
  }
}
