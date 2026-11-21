import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dala Festival 2026 Nairobi Tickets | Ferré Gola & Lineup",
  description: "Get Dala Festival 2026 tickets in Nairobi for 12 December at ASK Arena. See Ferré Gola, Prince Indah, Johnny Junior and more. Book securely online.",
  metadataBase: new URL("https://dalafestivaltickets.com"),
  alternates: { canonical: "https://dalafestivaltickets.com/" },
  keywords: ["Dala Festival", "Dala Festival 2026", "Nairobi music festival", "Kenya festival tickets", "Ferré Gola", "Prince Indah", "Johnny Junior"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dala Festival 2026 Nairobi Tickets | Ferré Gola & Lineup",
    description: "Get tickets for Dala Festival on 12 December 2026 at ASK Arena, Nairobi. Featuring Ferré Gola, Prince Indah and Johnny Junior.",
    url: "https://dalafestivaltickets.com/",
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Dala Festival 2026 Nairobi Tickets | Ferré Gola & Lineup",
    description: "Get tickets for 12 December 2026 at ASK Arena, Nairobi. Featuring Ferré Gola, Prince Indah and Johnny Junior."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
