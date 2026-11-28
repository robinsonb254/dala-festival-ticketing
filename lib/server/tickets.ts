export const TICKET_OFFER_START = new Date("2026-11-28T03:25:00+03:00").getTime();
export const TICKET_OFFER_END = new Date("2026-12-05T03:25:00+03:00").getTime();
export const TICKET_OFFER_PRICES: Record<string, number> = { Regular: 3_750, VIP: 7_500, VVIP: 18_750 };

export const TICKET_PRICES: Record<string, number> = {
  Regular: 5_000,
  VIP: 10_000,
  VVIP: 25_000,
  "Table of 4": 100_000,
  "Table of 8": 200_000,
};

export function normalizeKenyanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return "254" + digits.slice(1);
  if (/^[17]\d{8}$/.test(digits)) return "254" + digits;
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  throw new Error("Enter a valid Kenyan mobile number, e.g. 0712345678.");
}

export function makeOrderReference() {
  return "DALA-" + crypto.randomUUID().toUpperCase();
}
