"use client";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dala Festival 2026 | Tickets, Lineup & Event Information",
  description: "Explore Dala Festival 2026 in Nairobi on 12 December. Discover the featured artists, ticket categories and M-Pesa or PayPal checkout.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dala-festival-ticketing.vercel.app"),
  alternates: { canonical: "/" },
  keywords: ["Dala Festival", "Dala Festival 2026", "Nairobi music festival", "Kenya festival tickets", "Ferré Gola", "Prince Indah", "Johnny Junior"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dala Festival 2026 | Nairobi",
    description: "Music, culture and unforgettable live experiences. Explore the lineup and ticket options for 12 December 2026.",
    url: "/",
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Dala Festival 2026 | Nairobi",
    description: "Explore the lineup and ticket options for 12 December 2026."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
