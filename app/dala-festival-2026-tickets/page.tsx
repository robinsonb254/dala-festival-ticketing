import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://dalafestivaltickets.com";
const pageUrl = `${siteUrl}/dala-festival-2026-tickets`;

export const metadata: Metadata = {
  title: "Dala Festival December 2026 Tickets Kenya | Ferré Gola in Nairobi",
  description: "Dala Festival December 2026 tickets, event details, artists, venue and prices. See Ferré Gola, Prince Indah, Johnny Junior and more at ASK Arena, Nairobi on 12 December.",
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
  "startDate": "2026-12-12T14:00:00+03:00",
  "endDate": "2026-12-13T04:00:00+03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "url": pageUrl,
  "location": {
    "@type": "Place",
    "name": "ASK Arena, Nairobi Showground",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi Showground, Jamhuri Park, off Ngong Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "addressCountry": "KE"
    }
  },
  "image": [
    "https://i.ibb.co/TDVhfnGC/file-00000000ab5482089142cc3e3b527b44.png",
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
  "offers": [
    { "@type": "Offer", "name": "Regular", "url": `${siteUrl}/?ticket=regular#tickets`, "priceCurrency": "KES", "price": 5000 },
    { "@type": "Offer", "name": "VIP", "url": `${siteUrl}/?ticket=vip#tickets`, "priceCurrency": "KES", "price": 10000 },
    { "@type": "Offer", "name": "VVIP", "url": `${siteUrl}/?ticket=vvip#tickets`, "priceCurrency": "KES", "price": 25000 },
    { "@type": "Offer", "name": "Table of 4", "url": `${siteUrl}/?ticket=table-of-4#tickets`, "priceCurrency": "KES", "price": 100000 },
    { "@type": "Offer", "name": "Table of 8", "url": `${siteUrl}/?ticket=table-of-8#tickets`, "priceCurrency": "KES", "price": 200000 }
  ]
};

const ticketPrices = [
  ["Regular", "KSh 5,000", "General admission"],
  ["VIP", "KSh 10,000", "VIP ticket category"],
  ["VVIP", "KSh 25,000", "VVIP ticket category"],
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
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📍 ASK Arena, Nairobi Showground</span>\n          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>🕑 2:00 PM – 4:00 AM (overnight)</span>
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
        <div style={{ marginTop: 22 }}>
          <h3 style={{ fontSize: 20 }}>Explore each ticket category</h3>
          <ul style={{ lineHeight: 2.1, paddingLeft: 22 }}>
            <li><Link href="/tickets/regular" style={{ color: "#e7b85c" }}>Regular tickets — KSh 5,000</Link></li>
            <li><Link href="/tickets/vip" style={{ color: "#e7b85c" }}>VIP tickets — KSh 10,000</Link></li>
            <li><Link href="/tickets/vvip" style={{ color: "#e7b85c" }}>VVIP tickets — KSh 25,000</Link></li>
            <li><Link href="/tickets/table-of-4" style={{ color: "#e7b85c" }}>Table of 4 — KSh 100,000</Link></li>
            <li><Link href="/tickets/table-of-8" style={{ color: "#e7b85c" }}>Table of 8 — KSh 200,000</Link></li>
          </ul>
        </div>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Venue and event information</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>Dala Festival 2026 takes place at <strong>ASK Arena, Nairobi Showground, Nairobi, Kenya</strong>. Gates/event programme begins at <strong>2:00 PM on Saturday, 12 December 2026</strong> and runs until <strong>4:00 AM on Sunday, 13 December 2026</strong> (East Africa Time). The venue is in the Jamhuri Park area, off Ngong Road. <a href="https://www.google.com/maps/search/?api=1&query=ASK+Arena%2C+Nairobi+Showground%2C+Nairobi" target="_blank" rel="noreferrer" style={{ color: "#e7b85c", fontWeight: 800 }}>Open venue directions in Google Maps ↗</a> · <Link href="/#venue" style={{ color: "#e7b85c", fontWeight: 800 }}>Read the Nairobi venue and travel guide ↗</Link></p>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>This website is an independently operated, organizer-authorized ticketing platform for Dala Festival 2026. For ticket enquiries, contact <a href="mailto:dalafestive@gmail.com" style={{ color: "#e7b85c" }}>dalafestive@gmail.com</a>.</p>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival 2026: frequently asked questions</h2>
        {[
          ["When is Dala Festival 2026?", "The event starts at 2:00 PM on Saturday, 12 December 2026 and runs until 4:00 AM on Sunday, 13 December 2026 (East Africa Time)."],
          ["Where is Dala Festival held?", "Dala Festival takes place at ASK Arena, Nairobi Showground, in the Jamhuri Park area off Ngong Road, Nairobi."],
          ["Who is performing at Dala Festival?", "The announced lineup features Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs."],
          ["How much are Dala Festival tickets?", "Regular tickets are KSh 5,000; VIP KSh 10,000; VVIP KSh 25,000; Table of 4 KSh 100,000; and Table of 8 KSh 200,000."],
          ["How can I buy tickets online?", "Choose a ticket category and quantity on the ticket checkout page, enter your details, select a payment method and follow the checkout instructions."],
          ["Which payment methods can I use?", "M-Pesa and PayPal are available. A debit/credit card option is also shown at checkout and is processed through PayPal."],
          ["When is my order confirmed?", "Your order is confirmed after the payment provider verifies successful payment and the platform records the confirmed status. Keep your order reference and payment confirmation."],
          ["What should I do if payment is deducted but my order is not confirmed?", "Do not create a duplicate order while the payment is pending. Email dalafestive@gmail.com with your order reference so the payment can be checked."],
          ["How do I get help with my ticket order?", "Email dalafestive@gmail.com. Include your order reference where available, and never share your M-Pesa PIN, PayPal password or one-time verification codes."]
        ].map(([question, answer]) => <div key={question} style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}><h3>{question}</h3><p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>{answer}</p></div>)}
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 28, marginTop: 0 }}>Read the Nairobi concert guide</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>Planning to see Ferré Gola in Nairobi? Read our guide to the 12 December 2026 Dala Festival, including the venue and announced performers.</p>
        <p><Link href="/ferre-gola-nairobi-december-2026" style={{ color: "#e7b85c", fontWeight: 800, textDecoration: "none" }}>Ferré Gola in Nairobi: December 2026 concert guide ↗</Link></p>
      </section>

      <footer style={{ borderTop: "1px solid #292a2d", padding: "26px 24px", color: "#aaa196", textAlign: "center", fontSize: 13 }}>
        © 2026 Dala Festival Ticketing · <Link href="/" style={{ color: "#e7b85c" }}>Main website</Link> · <Link href="/terms" style={{ color: "#e7b85c" }}>Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}
