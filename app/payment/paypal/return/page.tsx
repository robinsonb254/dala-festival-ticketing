"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function PaypalReturnContent() {
  const params = useSearchParams();
  const reference = params.get("reference") || "";
  const paypalOrderId = params.get("token") || "";
  const [message, setMessage] = useState("Verifying your PayPal payment...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    async function capture() {
      if (!reference || !paypalOrderId) {
        setMessage("The PayPal return details are incomplete. Contact support with your order reference.");
        setDone(true);
        return;
      }
      try {
        const response = await fetch("/api/payments/paypal/capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, paypalOrderId }),
        });
        const data = await response.json();
        if (!active) return;
        if (!response.ok || !data.ok) throw new Error(data.error || "PayPal payment could not be confirmed.");
        setMessage("Payment confirmed. Your Dala Festival order " + reference + " is paid. Keep this reference safe.");
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Payment verification is pending. Please contact support.");
      } finally {
        if (active) setDone(true);
      }
    }
    void capture();
    return () => { active = false; };
  }, [reference, paypalOrderId]);

  return <main className="payment-result"><div className="payment-result-card"><span className="payment-result-kicker">DALA FESTIVAL · PAYPAL</span><h1>{done ? "PAYMENT UPDATE" : "VERIFYING PAYMENT"}</h1><p>{message}</p>{reference && <small>ORDER REFERENCE: {reference}</small>}<a href="/#tickets">Return to Dala Festival</a></div></main>;
}

export default function PaypalReturnPage() { return <Suspense fallback={<main className="payment-result"><p>Loading payment details...</p></main>}><PaypalReturnContent /></Suspense>; }
