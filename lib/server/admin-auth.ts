import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const COOKIE = "dala_admin_session";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  const value = process.env.DALA_ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("DALA_ADMIN_SESSION_SECRET must contain at least 32 characters.");
  return value;
}
function signature(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}
export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  return { value: payload + "." + signature(payload), maxAge: MAX_AGE, cookieName: COOKIE };
}
export function isAdminToken(token: string | undefined) {
  try {
    if (!token) return false;
    const [payload, supplied] = token.split(".");
    if (!payload || !supplied) return false;
    const expected = signature(payload);
    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Number.isFinite(data.exp) && data.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}
export function isAdminRequest(request: NextRequest) {
  return isAdminToken(request.cookies.get(COOKIE)?.value);
}
export function credentialsMatch(email: string, password: string) {
  const expectedEmail = process.env.DALA_ADMIN_EMAIL || "";
  const expectedPassword = process.env.DALA_ADMIN_PASSWORD || "";
  if (!expectedEmail || !expectedPassword || !process.env.DALA_ADMIN_SESSION_SECRET) return false;
  const safeEqual = (left: string, right: string) => {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    return a.length === b.length && timingSafeEqual(a, b);
  };
  return safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) && safeEqual(password, expectedPassword);
}
export const ADMIN_COOKIE = COOKIE;
