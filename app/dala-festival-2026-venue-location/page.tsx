import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://dalafestivaltickets.com";
const pageUrl = `${siteUrl}/dala-festival-2026-venue-location`;

export const metadata: Metadata = {
  title: "Dala Festival 2026 Venue & Location | ASK Arena Nairobi",
  description: "Find the Dala Festival December 2026 venue and location. Get directions to ASK Arena at Nairobi Showground, Jamhuri Park, off Ngong Road, Nairobi.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Dala Festival 2026 Venue & Location | ASK Arena Nairobi",
    description: "Venue details and directions for Dala Festival on 12 December 2026 at ASK Arena, Nairobi Showground.",
    url: pageUrl,
    siteName: "Dala Festival Ticketing",
    locale: "en_KE",
    type: "website"
  },
  robots: { index: true, follow: true }
};

const venueData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Dala Festival 2026 Venue and Location",
  "description": "Venue information and directions for Dala Festival 2026 at ASK Arena, Nairobi Showground.",
  "url": pageUrl,
  "about": {
    "@type": "Place",
    "name": "ASK Arena, Nairobi Showground",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi Showground, Jamhuri Park, off Ngong Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "addressCountry": "KE"
    }
  }
};

const section = { maxWidth: 920, margin: "0 auto", padding: "38px 24px" } as const;
const gold = { color: "#e7b85c", fontWeight: 800, textDecoration: "none" } as const;

export default function DalaVenueLocationPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090a0d", color: "#f7f3eb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueData) }} />
      <header style={{ borderBottom: "1px solid #292a2d", padding: "18px 24px" }}>
        <div style={{ ...section, padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ color: "#f7f3eb", textDecoration: "none", fontWeight: 900, letterSpacing: 2 }}>DALA FESTIVAL <span style={{ color: "#e7b85c" }}>2026</span></Link>
          <Link href="/#tickets" style={gold}>Tickets ↗</Link>
        </div>
      </header>

      <section style={{ ...section, paddingTop: 68, paddingBottom: 52 }}>
        <p style={{ color: "#e7b85c", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>Nairobi · 12 December 2026</p>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 68px)", lineHeight: 1.04, letterSpacing: -2, margin: "18px 0" }}>Dala Festival 2026 venue and location</h1>
        <p style={{ color: "#d0c9bd", fontSize: 19, lineHeight: 1.8, maxWidth: 780 }}>Dala Festival takes place at <strong>ASK Arena, Nairobi Showground, in the Jamhuri Park area off Ngong Road, Nairobi, Kenya</strong>. This guide covers the venue location and how to open directions before travelling to the festival.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>Saturday, 12 December 2026</span>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>2:00 PM – 4:00 AM EAT</span>
          <span style={{ border: "1px solid #444", borderRadius: 999, padding: "10px 15px" }}>ASK Arena, Nairobi</span>
        </div>
        <p style={{ marginTop: 28 }}><a href="https://www.google.com/maps/search/?api=1&query=ASK+Arena%2C+Nairobi+Showground%2C+Nairobi" target="_blank" rel="noreferrer" style={{ display: "inline-flex", padding: "15px 24px", borderRadius: 999, background: "#e7b85c", color: "#17130d", fontWeight: 900, textDecoration: "none" }}>Get directions on Google Maps ↗</a></p>
      </section>

      <section style={{ ...section, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 30, marginTop: 0 }}>Where is ASK Arena?</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>The event venue is ASK Arena at Nairobi Showground, Jamhuri Park, off Ngong Road in Nairobi. When planning your trip, use the Google Maps directions link above and confirm your route before departure. Allow extra travel time around event hours.</p>
        <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>The venue is the event location; it is not a ticket collection office. Check your order confirmation and the event's published entry instructions before travelling.</p>
      </section>

      <section style={{ ...section, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 30, marginTop: 0 }}>Dala Festival December 2026 event hours</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>The festival programme is scheduled to begin at <strong>2:00 PM on Saturday, 12 December 2026</strong> and run until <strong>4:00 AM on Sunday, 13 December 2026</strong> (East Africa Time, EAT). It is an overnight event, so plan your transport to and from Nairobi Showground accordingly.</p>
      </section>

      <section style={{ ...section, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 30, marginTop: 0 }}>What to expect at the festival</h2>
        <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Ferré Gola headlines Dala Festival 2026, with the announced lineup also featuring Prince Indah, Johnny Junior, Les Wanyika and special guest DJs. Fans looking for Ferré Gola live in Nairobi in 2026 can find the event and ticket information through our festival guide.</p>
        <p><Link href="/ferre-gola-nairobi-december-2026" style={gold}>Read: Ferré Gola in Nairobi — December 2026 ↗</Link></p>
        <p><Link href="/dala-festival-2026-tickets" style={gold}>View Dala Festival 2026 event and ticket details ↗</Link></p>
      </section>

      <section style={{ ...section, borderTop: "1px solid #292a2d" }}>
        <h2 style={{ fontSize: 30, marginTop: 0 }}>Frequently asked questions about the venue</h2>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "15px 0" }}>
          <h3>What is the venue for Dala Festival 2026?</h3>
          <p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>The event is scheduled for ASK Arena, Nairobi Showground, Jamhuri Park, off Ngong Road, Nairobi.</p>
        </div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "15px 0" }}>
          <h3>How do I get directions to ASK Arena?</h3>
          <p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>Use the Get directions on Google Maps link on this page and check your route before travelling.</p>
        </div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "15px 0" }}>
          <h3>What time does Dala Festival start and end?</h3>
          <p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>The published event hours are 2:00 PM on Saturday, 12 December to 4:00 AM on Sunday, 13 December 2026 (EAT).</p>
        </div>
        <div style={{ borderBottom: "1px solid #292a2d", padding: "15px 0" }}>
          <h3>Where can I buy tickets?</h3>
          <p style={{ color: "#d0c9bd", lineHeight: 1.75 }}>Visit the <Link href="/#tickets" style={gold}>ticket checkout section</Link> to view the available categories and complete an online order.</p>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #292a2d", padding: "26px 24px", color: "#aaa196", textAlign: "center", fontSize: 13 }}>
        © 2026 Dala Festival Ticketing · <Link href="/" style={gold}>Home</Link> · <Link href="/dala-festival-2026-tickets" style={gold}>Festival tickets and event guide</Link> · <Link href="/ferre-gola-nairobi-december-2026" style={gold}>Ferré Gola in Nairobi</Link> · <Link href="/terms" style={gold}>Terms & Conditions</Link>
      </footer>
    </main>
  );
}
