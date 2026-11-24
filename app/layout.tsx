import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://dalafestivaltickets.com";


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
  title: "Dala Festival 2026 Tickets | Ferré Gola Live in Nairobi",
  description: "Buy Dala Festival 2026 tickets in Nairobi for Ferré Gola live on 12 December at ASK Arena. Choose Regular, VIP, VVIP or group tables.",
  metadataBase: new URL(siteUrl),
  icons: { icon: "/dala-festival-logo.webp", shortcut: "/dala-festival-logo.webp", apple: "/dala-festival-logo.webp" },
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
    title: "Dala Festival 2026 Tickets | Ferré Gola Live in Nairobi",
    description: "Buy Dala Festival tickets for Ferré Gola live in Nairobi on 12 December 2026 at ASK Arena. Regular, VIP, VVIP and group tables.",
    url: `${siteUrl}/`,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website",
    images: [{ url: "/dala-festival-logo.webp", width: 192, height: 192, alt: "Dala Festival logo" }]
  },
  twitter: {
    card: "summary",
    images: ["/dala-festival-logo.webp"],
    title: "Dala Festival 2026 Tickets | Ferré Gola Live in Nairobi",
    description: "Get Dala Festival 2026 tickets for Ferré Gola in Nairobi on 12 December. Choose your ticket category and book online."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script dangerouslySetInnerHTML={{ __html: "(()=>{const link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=optional\";document.head.appendChild(link)})()" }} />
        {children}
      </body>
    </html>
  );
}
