import "server-only";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error("Missing environment variable: " + name);
  return value;
};

export async function darajaAccessToken() {
  const environment = process.env.MPESA_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
  const base = environment === "sandbox" ? "https://sandbox.safaricom.co.ke" : "https://api.safaricom.co.ke";
  const credentials = Buffer.from(required("MPESA_CONSUMER_KEY") + ":" + required("MPESA_CONSUMER_SECRET")).toString("base64");
  const response = await fetch(base + "/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: "Basic " + credentials }, cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Unable to authenticate with M-Pesa. Check Daraja credentials.");
  return { token: data.access_token as string, base };
}

export function mpesaTimestamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return value.year + value.month + value.day + value.hour + value.minute + value.second;
}

export async function initiateMpesaStk(input: { phone: string; amount: number; orderReference: string }) {
  const { token, base } = await darajaAccessToken();
  const shortcode = required("MPESA_SHORTCODE");
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(shortcode + required("MPESA_PASSKEY") + timestamp).toString("base64");
  const response = await fetch(base + "/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({
      BusinessShortCode: shortcode, Password: password, Timestamp: timestamp,
      TransactionType: process.env.MPESA_TRANSACTION_TYPE || "CustomerBuyGoodsOnline",
      Amount: input.amount, PartyA: input.phone, PartyB: shortcode, PhoneNumber: input.phone,
      CallBackURL: required("MPESA_CALLBACK_URL"),
      AccountReference: input.orderReference.slice(0, 12), TransactionDesc: "Dala Festival ticket",
    }),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.CheckoutRequestID) throw new Error(data.errorMessage || data.ResponseDescription || "M-Pesa STK Push could not be started.");
  return data as { CheckoutRequestID: string; MerchantRequestID: string; CustomerMessage?: string };
}

export async function queryMpesaStk(checkoutRequestId: string) {
  const { token, base } = await darajaAccessToken();
  const shortcode = required("MPESA_SHORTCODE");
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(shortcode + required("MPESA_PASSKEY") + timestamp).toString("base64");
  const response = await fetch(base + "/mpesa/stkpushquery/v1/query", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ BusinessShortCode: shortcode, Password: password, Timestamp: timestamp, CheckoutRequestID: checkoutRequestId }),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.errorMessage || "M-Pesa transaction verification failed.");
  return data as Record<string, unknown>;
}

export async function paypalAccessToken() {
  const environment = process.env.PAYPAL_ENVIRONMENT === "live" ? "live" : "sandbox";
  const base = environment === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
  const credentials = Buffer.from(required("PAYPAL_CLIENT_ID") + ":" + required("PAYPAL_CLIENT_SECRET")).toString("base64");
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "POST", headers: { Authorization: "Basic " + credentials, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials", cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error("Unable to authenticate with PayPal.");
  return { token: data.access_token as string, base };
}

export async function createPaypalOrder(input: { amountKes: number; orderReference: string; siteUrl: string }) {
  const { token, base } = await paypalAccessToken();
  const kesUsdRate = Number(process.env.PAYPAL_KES_TO_USD_RATE);
  if (!Number.isFinite(kesUsdRate) || kesUsdRate <= 0) throw new Error("PayPal checkout is not configured with an approved KES-to-USD rate.");
  const amount = (input.amountKes / kesUsdRate).toFixed(2);
  const response = await fetch(base + "/v2/checkout/orders", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ reference_id: input.orderReference, invoice_id: input.orderReference, custom_id: input.orderReference,
        amount: { currency_code: "USD", value: amount }, description: "Dala Festival ticket" }],
      payment_source: { paypal: { experience_context: {
        return_url: input.siteUrl + "/payment/paypal/return?reference=" + encodeURIComponent(input.orderReference),
        cancel_url: input.siteUrl + "/payment/paypal/cancel?reference=" + encodeURIComponent(input.orderReference),
        user_action: "PAY_NOW", shipping_preference: "NO_SHIPPING",
      } } },
    }),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.id) throw new Error(data.message || "Unable to create PayPal checkout.");
  const approvalUrl = data.links?.find((link: { rel: string }) => link.rel === "payer-action" || link.rel === "approve")?.href;
  if (!approvalUrl) throw new Error("PayPal did not return an approval link.");
  return { id: data.id as string, approvalUrl, usdAmount: amount };
}

export async function capturePaypalOrder(paypalOrderId: string) {
  const { token, base } = await paypalAccessToken();
  const response = await fetch(base + "/v2/checkout/orders/" + encodeURIComponent(paypalOrderId) + "/capture", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: "{}", cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "PayPal capture failed.");
  return data as Record<string, any>;
}
