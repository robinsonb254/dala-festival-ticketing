"use client";

import { useSearchParams } from "next/navigation";

export default function PaypalCancelPage() {
  const params = useSearchParams();
  const reference = params.get("reference") || "";
  return <main className="payment-result"><div className="payment-result-card"><span className="payment-result-kicker">DALA FESTIVAL · PAYPAL</span><h1>CHECKOUT CANCELLED</h1><p>Your PayPal checkout was cancelled. No payment has been confirmed. You can return to the ticket page and try again.</p>{reference && <small>ORDER REFERENCE: {reference}</small>}<a href="/#tickets">Return to ticket selection</a></div></main>;
}
