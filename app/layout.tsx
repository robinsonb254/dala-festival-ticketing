import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = "https://dalafestivaltickets.com";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--font-cormorant" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-dm-mono" });

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Dala Festival Ticketing",
      "url": siteUrl,
      "email": "dalafestive@gmail.com",
      "description": "An independently operated, organizer-authorized ticketing platform providing online ticket sales for Dala Festival 2026."
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Dala Festival Ticketing",
      "description": "Tickets and event information for Dala Festival 2026 in Nairobi.",
      "publisher": { "@id": `${siteUrl}/#organization` },
      "inLanguage": "en-KE"
    }
  ]
};

export const metadata: Metadata = {
  title: "Dala Festival 2026 Tickets in Nairobi | Ferré Gola",
  description: "Book Dala Festival 2026 tickets for 12 December at ASK Arena, Nairobi Showground. Featuring Ferré Gola, Prince Indah, Johnny Junior and more. Tickets from KSh 5,000.",
  metadataBase: new URL(siteUrl),
  applicationName: "Dala Festival Ticketing",
  alternates: { canonical: `${siteUrl}/` },
  keywords: [
    "Dala Festival 2026 tickets",
    "Dala Festival Nairobi",
    "Dala Festival tickets Kenya",
    "Ferré Gola Nairobi 2026",
    "12 December 2026 events Nairobi",
    "Kenya music festival tickets",
    "Prince Indah",
    "Johnny Junior"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Dala Festival 2026 Tickets in Nairobi | Ferré Gola",
    description: "Book tickets for Dala Festival on 12 December 2026 at ASK Arena, Nairobi Showground. Featuring Ferré Gola, Prince Indah, Johnny Junior and more.",
    url: `${siteUrl}/`,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Dala Festival 2026 Tickets in Nairobi | Ferré Gola",
    description: "Book tickets for 12 December 2026 at ASK Arena, Nairobi Showground. Featuring Ferré Gola, Prince Indah and Johnny Junior."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
