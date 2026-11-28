"use client";

import { useEffect, useState } from "react";

export default function TicketAvailability({ ticketType }: { ticketType: string }) {
  const [status, setStatus] = useState<{ active: boolean; remaining: number }>({
    active: false,
    remaining: 3,
  });

  useEffect(() => {
    let mounted = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/ticket-availability", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!mounted) return;
        const count = Number(data.availability?.[ticketType]);
        setStatus({
          active: data.active === true && Number.isInteger(count) && count >= 1 && count <= 3,
          remaining: count,
        });
      } catch {
        // Keep the last confirmed count during a brief network interruption.
      }
    };
    void refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [ticketType]);

  if (!status.active) return null;
  return (
    <span aria-live="polite" style={{
      display: "inline-flex", alignItems: "center", marginTop: 8,
      padding: "7px 10px", border: "1px solid #6b753f", borderRadius: 999,
      color: "#e7b85c", fontSize: 11, fontWeight: 800, letterSpacing: ".3px",
    }}>
      Only {status.remaining} tickets available
    </span>
  );
}
