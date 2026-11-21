import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://dalafestivaltickets.com";
const pageUrl = `${siteUrl}/ferre-gola-nairobi-december-2026`;

export const metadata: Metadata = {
  title: "Ferré Gola in Nairobi December 2026 | Dala Festival",
  description: "Ferré Gola brings Congolese rhumba to Nairobi on 12 December 2026 at ASK Arena for Dala Festival, alongside Prince Indah, Johnny Junior and more.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Ferré Gola in Nairobi December 2026 | Dala Festival",
    description: "Event guide to Ferré Gola's Nairobi performance at Dala Festival on 12 December 2026: venue, lineup and ticket information.",
    url: pageUrl,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "article"
  },
  robots: { index: true, follow: true }
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ferré Gola in Nairobi: Dala Festival December 2026",
  "description": "A guide to Ferré Gola's live performance in Nairobi at Dala Festival on 12 December 2026.",
  "datePublished": "2026-11-22",
  "dateModified": "2026-11-22",
  "mainEntityOfPage": pageUrl,
  "author": { "@type": "Organization", "name": "Dala Festival Ticketing" },
  "publisher": { "@type": "Organization", "name": "Dala Festival Ticketing", "url": siteUrl }
};

const sectionStyle = { maxWidth: 900, margin: "0 auto", padding: "38px 24px" } as const;
const linkStyle = { color: "#e7b85c", fontWeight: 800, textDecoration: "none" } as const;
const ctaStyle = { display: "inline-flex", padding: "15px 24px", borderRadius: 999, background: "#e7b85c", color: "#17130d", fontWeight: 900, textDecoration: "none" } as const;

export default function FerreGolaNairobiArticle() {
  return (
    <main style={{ minHeight: "100vh", background: "#090a0d", color: "#f7f3eb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      <header style={{ borderBottom: "1px solid #292a2d", padding: "18px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ color: "#f7f3eb", textDecoration: "none", fontWeight: 900, letterSpacing: 2 }}>DALA FESTIVAL <span style={{ color: "#e7b85c" }}>2026</span></Link>
          <Link href="/#tickets" style={linkStyle}>Tickets ↗</Link>
        </div>
      </header>

      <article>
        <section style={{ ...sectionStyle, paddingTop: 68, paddingBottom: 36 }}>
          <p style={{ color: "#e7b85c", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>Nairobi concert guide · 12 December 2026</p>
          <h1 style={{ fontSize: "clamp(38px, 7vw, 68px)", lineHeight: 1.04, letterSpacing: -2, margin: "18px 0" }}>Ferré Gola in Nairobi: Dala Festival December 2026</h1>
          <p style={{ color: "#d0c9bd", fontSize: 19, lineHeight: 1.75, maxWidth: 780 }}>Nairobi is set for a major night of Congolese rhumba as Ferré Gola, known to fans as Le Padre, headlines Dala Festival on Saturday, 12 December 2026. The concert takes place at ASK Arena, Nairobi Showground, with a lineup that also features popular Kenyan performers.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📅 12 December 2026</span>
            <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>📍 ASK Arena, Nairobi</span>
          </div>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Ferré Gola brings Congolese rhumba to Nairobi</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Ferré Gola is widely recognised for his expressive vocals and his place in modern Congolese music. His Nairobi appearance gives fans an opportunity to experience his music live alongside other performers from Kenya's vibrant music scene.</p>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Dala Festival brings together live music, culture and entertainment for a one-day festival programme in Nairobi. The event is scheduled for Saturday, 12 December 2026, at ASK Arena within the Nairobi Showground.</p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Who is performing at Dala Festival?</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Ferré Gola headlines the announced lineup, joined by:</p>
          <ul style={{ lineHeight: 2.1, paddingLeft: 24 }}>
            <li><strong>Prince Indah</strong> — Kenyan singer known for his benga and ohangla-influenced music</li>
            <li><strong>Johnny Junior</strong> — Kenyan rhumba performer</li>
            <li><strong>Les Wanyika</strong> — celebrated East African band</li>
            <li><strong>Special guest DJs</strong> — adding to the festival atmosphere</li>
          </ul>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Lineup announcements and event information can change, so check the <Link href="/dala-festival-2026-tickets" style={linkStyle}>Dala Festival 2026 event and ticket guide</Link> for the latest details published on this website.</p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Date and venue: where to see Ferré Gola in Nairobi</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>The concert is scheduled for <strong>Saturday, 12 December 2026</strong> at <strong>ASK Arena, Nairobi Showground, Nairobi, Kenya</strong>. If you are travelling into Nairobi, plan your journey to the Showground in advance and check event updates before setting off.</p>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>For location and ticket-category information, visit the <Link href="/dala-festival-2026-tickets" style={linkStyle}>Dala Festival tickets page</Link>.</p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Dala Festival 2026 ticket information</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Ticket categories listed on this ticketing website include Regular, VIP, VVIP, Table of 4 and Table of 8. Prices and availability are displayed on the checkout page and may change as ticket allocations are updated.</p>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>This is an independently operated, organizer-authorized ticketing platform. Review the event details and ticket category carefully before completing a purchase.</p>
          <p style={{ marginTop: 26 }}><Link href="/#tickets" style={ctaStyle}>View Dala Festival tickets</Link></p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Frequently asked questions</h2>
          <div style={{ borderBottom: "1px solid #292a2d", padding: "14px 0" }}><h3>When is Ferré Gola performing in Nairobi?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>Ferré Gola is scheduled to headline Dala Festival on Saturday, 12 December 2026.</p></div>
          <div style={{ borderBottom: "1px solid #292a2d", padding: "14px 0" }}><h3>Where is the Dala Festival concert?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>The venue is ASK Arena, Nairobi Showground, Nairobi, Kenya.</p></div>
          <div style={{ borderBottom: "1px solid #292a2d", padding: "14px 0" }}><h3>Which other artists are on the lineup?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>The announced lineup includes Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.</p></div>
          <div style={{ borderBottom: "1px solid #292a2d", padding: "14px 0" }}><h3>Where can I find ticket prices?</h3><p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>See the <Link href="/dala-festival-2026-tickets" style={linkStyle}>Dala Festival 2026 ticket guide</Link> or visit the <Link href="/#tickets" style={linkStyle}>ticket checkout section</Link> for current categories and prices.</p></div>
        </section>
      </article>

      <footer style={{ borderTop: "1px solid #292a2d", padding: "26px 24px", color: "#aaa196", textAlign: "center", fontSize: 13 }}>
        © 2026 Dala Festival Ticketing · <Link href="/" style={linkStyle}>Main website</Link> · <Link href="/dala-festival-2026-tickets" style={linkStyle}>Festival tickets</Link> · <Link href="/terms" style={linkStyle}>Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}
