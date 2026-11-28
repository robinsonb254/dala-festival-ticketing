import type { Metadata } from "next";
import Link from "next/link";
import TicketAvailability from "@/components/TicketAvailability";

const siteUrl = "https://dalafestivaltickets.com";
const pageUrl = `${siteUrl}/dala-festival-2026-tickets`;
const socialImage = "https://i.ibb.co/TDVhfnGC/file-00000000ab5482089142cc3e3b527b44.png";

export const metadata: Metadata = {
  title: "Dala Festival December 2026 | Tickets, Ferré Gola Nairobi",
  description: "Dala Festival is in Nairobi on 12 December 2026. Explore ticket prices, Ferré Gola lineup, event hours and ASK Arena venue details.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Dala Festival December 2026 in Nairobi | Tickets & Lineup",
    description: "Dala Festival takes place 12 December 2026 at ASK Arena, Nairobi. See Ferré Gola, explore ticket categories and plan your visit.",
    url: pageUrl,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website",
    images: [{ url: socialImage, alt: "Dala Festival 2026 event poster featuring Ferré Gola" }]
  },
  robots: { index: true, follow: true }
};

const eventData = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Dala Festival 2026",
  "description": "A live music and culture festival in Nairobi featuring Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.",
  "startDate": "2026-12-12T15:00:00+03:00",
  "endDate": "2026-12-13T04:00:00+03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "url": pageUrl,
  "organizer": {
    "@type": "Organization",
    "name": "Dala Festival",
    "url": "https://dalafestival.com/",
    "email": "dalafestive@gmail.com"
  },
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
  "image": ["https://i.ibb.co/TDVhfnGC/file-00000000ab5482089142cc3e3b527b44.png"],
  "performer": [
    { "@type": "Person", "name": "Ferré Gola" },
    { "@type": "Person", "name": "Prince Indah" },
    { "@type": "Person", "name": "Johnny Junior" },
    { "@type": "MusicGroup", "name": "Les Wanyika" }
  ],
  "offers": [
    { "@type": "Offer", "name": "Regular", "url": `${siteUrl}/tickets/regular`, "priceCurrency": "KES", "price": 5000, "validFrom": "2026-11-22T00:00:00+03:00", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "VIP", "url": `${siteUrl}/tickets/vip`, "priceCurrency": "KES", "price": 10000, "validFrom": "2026-11-22T00:00:00+03:00", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "VVIP", "url": `${siteUrl}/tickets/vvip`, "priceCurrency": "KES", "price": 25000, "validFrom": "2026-11-22T00:00:00+03:00", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "Table of 4", "url": `${siteUrl}/tickets/table-of-4`, "priceCurrency": "KES", "price": 100000, "validFrom": "2026-11-22T00:00:00+03:00", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "Table of 8", "url": `${siteUrl}/tickets/table-of-8`, "priceCurrency": "KES", "price": 200000, "validFrom": "2026-11-22T00:00:00+03:00", "availability": "https://schema.org/InStock" }
  ]
};

const ticketPrices = [
  ["Die Hard", "KSh 3,500", "SOLD OUT"],
  ["Regular (Wave 1)", "KSh 4,000", "SOLD OUT"],
  ["First Wave VIP", "KSh 8,000", "SOLD OUT"],
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
        <h1 style={{ fontSize: "clamp(38px, 7vw, 72px)", lineHeight: 1.03, letterSpacing: -2, margin: "18px 0" }}>Dala Festival December 2026 in Nairobi: Tickets, Lineup &amp; Event Guide</h1>
        <p style={{ maxWidth: 760, color: "#d0c9bd", fontSize: 19, lineHeight: 1.7 }}>Find Dala Festival December 2026 event information in one place: ticket prices in Kenya, the announced artist lineup, venue directions and event hours. The festival brings Congolese music star Ferré Gola, Kenyan favourites and special guest DJs to ASK Arena, Nairobi Showground.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📅 Saturday, 12 December 2026</span>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📍 ASK Arena, Nairobi Showground</span>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>🕑 3:00 PM – 4:00 AM (overnight)</span>
        </div>
        <div style={{ marginTop: 30 }}><Link href="/#tickets" style={buttonStyle}>Buy Dala Festival tickets</Link></div>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival 2026 lineup</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.7 }}>The festival lineup features the artists below. Read the <Link href="/ferre-gola-nairobi-december-2026" style={{ color: "#e7b85c", fontWeight: 800 }}>Ferré Gola Nairobi concert guide</Link> for more details about the headline performance.</p>
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
            <thead><tr style={{ textAlign: "left", color: "#e7b85c" }}><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Ticket</th><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Price</th><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Access</th><th style={{ padding: 14, borderBottom: "1px solid #555" }}>Availability</th></tr></thead>
            <tbody>{ticketPrices.map(([name, price, note]) => <tr key={name}><td style={{ padding: 14, borderBottom: "1px solid #292a2d", fontWeight: 700 }}>{name}</td><td style={{ padding: 14, borderBottom: "1px solid #292a2d", color: "#e7b85c", fontWeight: 800 }}>{price}</td><td style={{ padding: 14, borderBottom: "1px solid #292a2d", color: "#d0c9bd" }}>{note}</td><td style={{ padding: 14, borderBottom: "1px solid #292a2d", whiteSpace: "nowrap" }}>{["Regular", "VIP", "VVIP", "Table of 4", "Table of 8"].includes(name) ? <TicketAvailability ticketType={name} /> : "—"}</td></tr>)}</tbody>
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
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>Dala Festival 2026 takes place at <strong>ASK Arena, Nairobi Showground, Nairobi, Kenya</strong>. Gates/event programme begins at <strong>3:00 PM on Saturday, 12 December 2026</strong> and runs until <strong>4:00 AM on Sunday, 13 December 2026</strong> (East Africa Time). The venue is in the Jamhuri Park area, off Ngong Road. <a href="https://www.google.com/maps/search/?api=1&query=ASK+Arena%2C+Nairobi+Showground%2C+Nairobi" target="_blank" rel="noreferrer" style={{ color: "#e7b85c", fontWeight: 800 }}>Open venue directions in Google Maps ↗</a> · <Link href="/dala-festival-2026-venue-location" style={{ color: "#e7b85c", fontWeight: 800 }}>Read the full ASK Arena venue and travel guide ↗</Link></p>
        <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>For ticket enquiries, contact <a href="mailto:dalafestive@gmail.com" style={{ color: "#17130d", background: "#e7b85c", padding: "3px 8px", borderRadius: 6, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>dalafestive@gmail.com</a>.</p>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <p style={{ color: "#e7b85c", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>The Dala experience</p>
          <div aria-label="Five decorative gold stars" style={{ color: "#e7b85c", fontSize: 34, letterSpacing: 8, margin: "10px 0" }}>★★★★★</div>
          <h2 style={{ fontSize: 32, margin: "10px 0 14px" }}>Five-star energy. One unforgettable night.</h2>
          <p style={{ color: "#aaa196", fontSize: 13, lineHeight: 1.6 }}>The stars are a decorative celebration of the experience we are aiming to create, not a customer rating. The highlights below are promotional opinions, not submitted customer reviews.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 30 }}>
          <article style={{ background: "#141519", border: "1px solid #343238", borderRadius: 18, padding: 22 }}>
            <div style={{ color: "#e7b85c", fontSize: 20, marginBottom: 12 }}>✦ ✦ ✦</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 19 }}>A headline performance to anticipate</h3>
            <p style={{ color: "#d0c9bd", lineHeight: 1.7, margin: 0 }}>With Ferré Gola leading the announced lineup, Dala Festival is shaping up to be a major date for live music fans.</p>
          </article>
          <article style={{ background: "#141519", border: "1px solid #343238", borderRadius: 18, padding: 22 }}>
            <div style={{ color: "#e7b85c", fontSize: 20, marginBottom: 12 }}>✦ ✦ ✦</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 19 }}>A night for music lovers</h3>
            <p style={{ color: "#d0c9bd", lineHeight: 1.7, margin: 0 }}>A mix of Congolese sounds, Kenyan favourites and guest DJs promises a lively celebration of music and culture.</p>
          </article>
          <article style={{ background: "#141519", border: "1px solid #343238", borderRadius: 18, padding: 22 }}>
            <div style={{ color: "#e7b85c", fontSize: 20, marginBottom: 12 }}>✦ ✦ ✦</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 19 }}>Choose your festival experience</h3>
            <p style={{ color: "#d0c9bd", lineHeight: 1.7, margin: 0 }}>From Regular admission to VIP, VVIP and group tables, there are ticket categories for different ways to enjoy the event.</p>
          </article>
        </div>
        <p style={{ textAlign: "center", marginTop: 28 }}><Link href="/#tickets" style={buttonStyle}>Get your Dala Festival tickets</Link></p>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 32, marginTop: 0 }}>Dala Festival 2026: frequently asked questions</h2>
        {[
          ["When is Dala Festival 2026?", "The event starts at 3:00 PM on Saturday, 12 December 2026 and runs until 4:00 AM on Sunday, 13 December 2026 (East Africa Time)."],
          ["Where is Dala Festival held?", "Dala Festival takes place at ASK Arena, Nairobi Showground, in the Jamhuri Park area off Ngong Road, Nairobi."],
          ["Who is performing at Dala Festival?", "The announced lineup features Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs."],
          ["How much are Dala Festival tickets?", "Earlier releases included Die Hard at KSh 3,500, Regular (Wave 1) at KSh 4,000 and First Wave VIP at KSh 8,000; all three are sold out. Current categories are Regular KSh 5,000, VIP KSh 10,000, VVIP KSh 25,000, Table of 4 KSh 100,000 and Table of 8 KSh 200,000."],
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
        © 2026 Dala Festival Ticketing · <Link href="/" style={{ color: "#e7b85c" }}>Main website</Link> · <Link href="/dala-festival-2026-venue-location" style={{ color: "#e7b85c" }}>Venue &amp; location guide</Link> · <Link href="/ferre-gola-nairobi-december-2026" style={{ color: "#e7b85c" }}>Ferré Gola in Nairobi</Link> · <Link href="/terms" style={{ color: "#e7b85c" }}>Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}
