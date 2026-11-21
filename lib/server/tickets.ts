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
  return "DALA-" + Date.now().toString(36).toUpperCase() + "-" +
    crypto.randomUUID().slice(0, 8).toUpperCase();
}
