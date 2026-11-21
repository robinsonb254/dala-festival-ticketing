import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dala Festival | Tickets & Event Information",
  description: "Discover Dala Festival, explore ticket categories and secure your place.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: {
    title: "Dala Festival",
    description: "A celebration of music, culture and unforgettable live experiences.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
