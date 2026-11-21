import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://dalafestivaltickets.com";
const pageUrl = `${siteUrl}/dala-festival-2026-tickets`;

export const metadata: Metadata = {
  title: "Dala Festival 2026 Tickets Kenya | Ferré Gola in Nairobi",
  description: "Find Dala Festival 2026 event details, artists, venue and ticket prices. Ferré Gola, Prince Indah, Johnny Junior and more at ASK Arena, Nairobi Showground on 12 December 2026.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Dala Festival 2026 Tickets Kenya | Ferré Gola in Nairobi",
    description: "Event details, lineup and ticket prices for Dala Festival 2026 on 12 December at ASK Arena, Nairobi.",
    url: pageUrl,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website"
  },
  robots: { index: true, follow: true }
};

const eventData = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Dala Festival 2026",
  "description": "A live music and culture festival in Nairobi featuring Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.",
  "startDate": "2026-12-12",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "ASK Arena, Nairobi Showground",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi Showground",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    }
  },
  "image": [
    `${siteUrl}/artists/ferre-gola.jpg`,
    `${siteUrl}/artists/prince-indah.jpg`,
    `${siteUrl}/artists/johnny-junior.jpg`
  ],
  "performer": [
    { "@type": "Person", "name": "Ferré Gola" },
    { "@type": "Person", "name": "Prince Indah" },
    { "@type": "Person", "name": "Johnny Junior" },
    { "@type": "MusicGroup", "name": "Les Wanyika" }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": `${siteUrl}/#tickets`,
    "priceCurrency": "KES",
    "lowPrice": "5000",
    "highPrice": "200000"
  }
};

const ticketPrices = [
  ["Regular", "KSh 5,000", "General admission"],
  ["VIP", "KSh 10,000", "Premium festival access"],
  ["VVIP", "KSh 25,000", "Elevated festival experience"],
  ["Table of 4", "KSh 100,000", "Reserved table for four"],
  ["Table of 8", "KSh 200,000", "Reserved table for eight"]
];

const sectionStyle = { maxWidth: 980, margin: "0 auto", padding: "52px 24px" } as const;
const buttonStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "15px 24px", borderRadius: 999, background: "#e7b85c", color: "#17130d", fontWeight: 800, textDecoration: "none" } as const;

export default function DalaFestivalTicketsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090a0d", color: "#f7f3eb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }} />
      <header style={{ borderBottom: "1px solid #292a2d", padding: "18px 24px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ color: "#f7f3eb", textDecoration: "none", fontWeight: 900, letterSpacing: 2 }}>DALA FESTIVAL <span style={{ color: "#e7b85c" }}>2026</span></Link>
          <Link href="/#tickets" style={{ color: "#e7b85c", textDecoration: "none", fontWeight: 700 }}>Tickets ↗</Link>
        </div>
      </header>

      <section style={{ ...sectionStyle, paddingTop: 76, paddingBottom: 64 }}>
        <p style={{ color: "#e7b85c", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>Nairobi · Live music · 12 December 2026</p>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 72px)", lineHeight: 1.03, letterSpacing: -2, margin: "18px 0" }}>Dala Festival 2026 tickets in Kenya</h1>
        <p style={{ maxWidth: 760, color: "#d0c9bd", fontSize: 19, lineHeight: 1.7 }}>Get ready for a celebration of music, culture and live performances in Nairobi. Dala Festival 2026 brings together Congolese music star Ferré Gola, Kenyan favourites and special guest DJs for one festival experience at ASK Arena, Nairobi Showground.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📅 Saturday, 12 December 2026</span>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📍 ASK Arena, Nairobi Showground</span>
        </div>
        <div style={{ marginTop: 30 }}><Link href="/#tickets" style={buttonStyle}>Buy Dala Festival tickets</Link></div>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival 2026 lineup</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>The festival lineup features:</p>
        <ul style={{ color: "#f7f3eb", lineHeight: 2, paddingLeft: 24 }}>
          <li><strong>Ferré Gola</strong> — headline performance</li>
          <li><strong>Prince Indah</strong> — live performance</li>
          <li><strong>Johnny Junior</strong> — live performance</li>
          <li><strong>Les Wanyika</strong></li>
          <li>Special guest DJs</li>
        </ul>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival ticket prices</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>Choose the ticket category that suits your festival plans. All prices are in Kenyan shillings.</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 320 }}>
            <thead><tr style={{ textAlign: "left", color: "#e7b85c" }}><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Ticket</th><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Price</th><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Access</th></tr></thead>
            <tbody>{ticketPrices.map(([name, price, note]) => <tr key={name}><td style={{ padding: 14, borderBottom: "1px solid #292a2d", fontWeight: 700 }}>{name}</td><td style={{ padding: 14, borderBottom: "1px solid #292a2d", color: "#e7b85c", fontWeight: 800 }}>{price}</td><td style={{ padding: 14, borderBottom: "1px solid #292a2d", color: "#d0c9bd" }}>{note}</td></tr>)}</tbody>
          </table>
        </div>
        <p style={{ marginTop: 24 }}><Link href="/#tickets" style={buttonStyle}>Choose tickets and checkout</Link></p>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Venue and event information</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>Dala Festival 2026 takes place at <strong>ASK Arena, Nairobi Showground, Nairobi, Kenya</strong>, on Saturday, 12 December 2026. The event brings music fans together for live performances and a festival atmosphere in Nairobi.</p>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>This website is an independently operated, organizer-authorized ticketing platform for Dala Festival 2026. For ticket enquiries, contact <a href="mailto:dalafestive@gmail.com" style={{ color: "#e7b85c" }}>dalafestive@gmail.com</a>.</p>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival tickets: frequently asked questions</h2>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}><h3>When is Dala Festival 2026?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>Dala Festival 2026 takes place on Saturday, 12 December 2026.</p></div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}><h3>Where is Dala Festival held?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>The venue is ASK Arena, Nairobi Showground, Nairobi, Kenya.</p></div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}><h3>Who is performing at Dala Festival?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>The announced lineup includes Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.</p></div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}><h3>How can I buy Dala Festival tickets?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>Select a ticket category on the <Link href="/#tickets" style={{ color: "#e7b85c" }}>ticket checkout page</Link> and follow the payment steps.</p></div>
      </section>

      <footer style={{ borderTop: "1px solid #292a2d", padding: "26px 24px", color: "#aaa196", textAlign: "center", fontSize: 13 }}>
        © 2026 Dala Festival Ticketing · <Link href="/" style={{ color: "#e7b85c" }}>Main website</Link> · <Link href="/terms" style={{ color: "#e7b85c" }}>Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}
