import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrl = "https://dalafestivaltickets.com";
const festivalImage = "https://i.ibb.co/TDVhfnGC/file-00000000ab5482089142cc3e3b527b44.png";

const ticketCategories = {
  regular: {
    name: "Regular",
    price: 5000,
    priceLabel: "KSh 5,000",
    title: "Dala Festival 2026 Regular Tickets Kenya | KSh 5,000",
    description: "Buy Regular tickets for Dala Festival 2026 in Nairobi. Entry for the 12 December event at ASK Arena, featuring Ferré Gola and more. KSh 5,000.",
    intro: "Regular tickets are the general-admission ticket category for fans attending Dala Festival 2026 in Nairobi.",
    detail: "Choose a Regular ticket if you want to attend the festival and enjoy the announced live music programme. The listed price is KSh 5,000 per ticket.",
    audience: "Festivalgoers looking for the standard ticket category.",
    faqs: [
      ["How much is a Regular Dala Festival ticket?", "A Regular ticket is listed at KSh 5,000."],
      ["What event does the Regular ticket cover?", "It is a ticket for Dala Festival 2026 on 12 December at ASK Arena, Nairobi Showground."],
      ["Where do I buy a Regular ticket?", "Use the ticket checkout on this website, select Regular, and follow the payment instructions."]
    ]
  },
  vip: {
    name: "VIP",
    price: 10000,
    priceLabel: "KSh 10,000",
    title: "Dala Festival 2026 VIP Tickets Kenya | KSh 10,000",
    description: "Find Dala Festival 2026 VIP ticket price and booking details. Ferré Gola headlines in Nairobi on 12 December 2026. VIP tickets KSh 10,000.",
    intro: "The VIP category is a premium ticket option for Dala Festival 2026, scheduled for Saturday, 12 December 2026, in Nairobi.",
    detail: "A VIP ticket is listed at KSh 10,000. Select this category at checkout if VIP is the ticket option you want. Confirm the category shown in your order before making payment.",
    audience: "Fans choosing the VIP ticket category for the Dala Festival experience.",
    faqs: [
      ["What is the price of a Dala Festival VIP ticket?", "The listed VIP ticket price is KSh 10,000."],
      ["When and where is Dala Festival 2026?", "The festival is scheduled for 12 December 2026 at ASK Arena, Nairobi Showground, Nairobi."],
      ["How can I book a VIP ticket?", "Open the ticket checkout, choose VIP, and complete the displayed payment steps."]
    ]
  },
  vvip: {
    name: "VVIP",
    price: 25000,
    priceLabel: "KSh 25,000",
    title: "Dala Festival 2026 VVIP Tickets Kenya | KSh 25,000",
    description: "Book a VVIP ticket for Dala Festival 2026 in Nairobi. See the KSh 25,000 price and event details for Ferré Gola on 12 December.",
    intro: "VVIP is the highest-priced individual ticket category currently listed for Dala Festival 2026.",
    detail: "The VVIP ticket is listed at KSh 25,000. Choose this category during checkout if it matches the ticket option you intend to purchase. Review your selected category and total before paying.",
    audience: "Attendees who prefer the VVIP ticket category.",
    faqs: [
      ["How much is a VVIP ticket for Dala Festival?", "The listed VVIP ticket price is KSh 25,000."],
      ["Is VVIP a separate ticket category?", "Yes. VVIP is listed separately from Regular and VIP tickets on the Dala Festival ticket checkout."],
      ["How do I purchase a VVIP ticket?", "Select VVIP in the checkout section and follow the payment instructions."]
    ]
  },
  "table-of-4": {
    name: "Table of 4",
    price: 100000,
    priceLabel: "KSh 100,000",
    title: "Dala Festival 2026 Table of 4 Tickets | KSh 100,000",
    description: "Book the Dala Festival 2026 Table of 4 category in Nairobi. Listed at KSh 100,000 for a four-person table on 12 December.",
    intro: "The Table of 4 category is the listed table option for a group of four attending Dala Festival 2026 together.",
    detail: "The listed table price is KSh 100,000 for four people. That works out to KSh 25,000 per person when the total is shared equally. The checkout category is priced as one table booking.",
    audience: "A group of four planning to attend Dala Festival together.",
    faqs: [
      ["How much is a Table of 4 at Dala Festival?", "The listed price is KSh 100,000 for the Table of 4 category."],
      ["How much is that per person?", "Shared equally among four people, KSh 100,000 works out to KSh 25,000 per person."],
      ["How do I book a Table of 4?", "Choose Table of 4 in the ticket checkout and follow the payment steps for the listed table category."]
    ]
  },
  "table-of-8": {
    name: "Table of 8",
    price: 200000,
    priceLabel: "KSh 200,000",
    title: "Dala Festival 2026 Table of 8 Tickets | KSh 200,000",
    description: "Book the Dala Festival 2026 Table of 8 category in Nairobi. Listed at KSh 200,000 for an eight-person table on 12 December.",
    intro: "The Table of 8 category is the larger group table option listed for Dala Festival 2026.",
    detail: "The listed table price is KSh 200,000 for eight people. Shared equally, this is KSh 25,000 per person. The checkout category is priced as one table booking.",
    audience: "A group of eight planning to attend Dala Festival together.",
    faqs: [
      ["How much is a Table of 8 at Dala Festival?", "The listed price is KSh 200,000 for the Table of 8 category."],
      ["What is the cost per person?", "Shared equally among eight people, KSh 200,000 works out to KSh 25,000 per person."],
      ["How do I reserve a Table of 8?", "Select Table of 8 in the ticket checkout and follow the payment steps for the listed table category."]
    ]
  }
} as const;

type TicketSlug = keyof typeof ticketCategories;

export function generateStaticParams() {
  return Object.keys(ticketCategories).map((category) => ({ category }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!Object.prototype.hasOwnProperty.call(ticketCategories, category)) return {};
  const ticket = ticketCategories[category as TicketSlug];
  const pageUrl = `${siteUrl}/tickets/${category}`;
  return {
    title: ticket.title,
    description: ticket.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: ticket.title,
      description: ticket.description,
      url: pageUrl,
      siteName: "Dala Festival Ticketing",
      locale: "en_KE",
      type: "website"
    },
    robots: { index: true, follow: true }
  };
}

const sectionStyle = { maxWidth: 900, margin: "0 auto", padding: "42px 24px" } as const;
const linkStyle = { color: "#e7b85c", fontWeight: 800, textDecoration: "none" } as const;
const buttonStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "15px 24px", borderRadius: 999, background: "#e7b85c", color: "#17130d", fontWeight: 900, textDecoration: "none" } as const;

export default async function TicketCategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!Object.prototype.hasOwnProperty.call(ticketCategories, category)) notFound();
  const ticket = ticketCategories[category as TicketSlug];
  const pageUrl = `${siteUrl}/tickets/${category}`;
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ticket.faqs.map(([question, answer]) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer }
    }))
  };

  return (
    <main style={{ minHeight: "100vh", background: "#090a0d", color: "#f7f3eb", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <header style={{ borderBottom: "1px solid #292a2d", padding: "18px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ color: "#f7f3eb", textDecoration: "none", fontWeight: 900, letterSpacing: 2 }}>DALA FESTIVAL <span style={{ color: "#e7b85c" }}>2026</span></Link>
          <Link href={`/?ticket=${category}#tickets`} style={linkStyle}>Ticket checkout ↗</Link>
        </div>
      </header>

      <article>
        <section style={{ ...sectionStyle, paddingTop: 72, paddingBottom: 54 }}>
          <p style={{ color: "#e7b85c", fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>Dala Festival 2026 · Nairobi · 12 December</p>
          <h1 style={{ fontSize: "clamp(38px, 7vw, 68px)", lineHeight: 1.04, letterSpacing: -2, margin: "18px 0" }}>{ticket.name} tickets for Dala Festival 2026</h1>
          <p style={{ color: "#d0c9bd", fontSize: 19, lineHeight: 1.8, maxWidth: 760 }}>{ticket.intro}</p>
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 6, border: "1px solid #5b4b2f", borderRadius: 18, padding: "20px 24px", marginTop: 18 }}>
            <span style={{ color: "#aaa196", fontSize: 13 }}>Listed ticket price</span>
            <strong style={{ color: "#e7b85c", fontSize: 32 }}>{ticket.priceLabel}</strong>
            <span style={{ color: "#aaa196", fontSize: 13 }}>{category.startsWith("table-") ? "Per table booking" : "Per ticket"}</span>
          </div>
          <p style={{ color: "#d0c9bd", lineHeight: 1.8, maxWidth: 760, marginTop: 24 }}>{ticket.detail}</p>
          <p style={{ marginTop: 28 }}><Link href={`/?ticket=${category}#tickets`} style={buttonStyle}>Choose {ticket.name} and checkout</Link></p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Dala Festival 2026 event details</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>Dala Festival takes place from <strong>3:00 PM on Saturday, 12 December until 4:00 AM on Sunday, 13 December 2026</strong> (East Africa Time) at <strong>ASK Arena, Nairobi Showground, Nairobi, Kenya</strong>, in the Jamhuri Park area off Ngong Road. <a href="https://www.google.com/maps/search/?api=1&query=ASK+Arena%2C+Nairobi+Showground%2C+Nairobi" target="_blank" rel="noreferrer" style={{ color: "#e7b85c", fontWeight: 800 }}>Get directions in Google Maps ↗</a> · <Link href="/#venue" style={linkStyle}>Read the venue and travel guide ↗</Link> The announced lineup features Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.</p>
          <p style={{ color: "#d0c9bd", lineHeight: 1.85 }}>This category is intended for: {ticket.audience}</p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>Other Dala Festival ticket categories</h2>
          <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>Compare the five listed ticket options before choosing the one that suits your plans.</p>
          <ul style={{ lineHeight: 2.1, paddingLeft: 22 }}>
            {Object.entries(ticketCategories).filter(([slug]) => slug !== category).map(([slug, item]) => (
              <li key={slug}><Link href={`/tickets/${slug}`} style={linkStyle}>{item.name} tickets — {item.priceLabel}</Link></li>
            ))}
          </ul>
          <p><Link href="/dala-festival-2026-tickets" style={linkStyle}>See the complete Dala Festival 2026 ticket and event guide ↗</Link></p>
        </section>

        <section style={{ ...sectionStyle, borderTop: "1px solid #292a2d" }}>
          <h2 style={{ fontSize: 30, marginTop: 0 }}>{ticket.name} ticket questions</h2>
          {ticket.faqs.map(([question, answer]) => (
            <div key={question} style={{ borderBottom: "1px solid #292a2d", padding: "16px 0" }}>
              <h3 style={{ fontSize: 18 }}>{question}</h3>
              <p style={{ color: "#d0c9bd", lineHeight: 1.8 }}>{answer}</p>
            </div>
          ))}
          <p style={{ color: "#d0c9bd", lineHeight: 1.8, marginTop: 24 }}>For ticket enquiries, contact <a href="mailto:dalafestive@gmail.com" style={linkStyle}>dalafestive@gmail.com</a>.</p>
          <p><Link href={`/?ticket=${category}#tickets`} style={buttonStyle}>Buy Dala Festival tickets</Link></p>
        </section>
      </article>

      <footer style={{ borderTop: "1px solid #292a2d", padding: "26px 24px", color: "#aaa196", textAlign: "center", fontSize: 13 }}>
        © 2026 Dala Festival Ticketing · <Link href="/" style={linkStyle}>Main website and checkout</Link> · <Link href="/dala-festival-2026-tickets" style={linkStyle}>Festival event guide</Link> · <Link href="/dala-festival-2026-venue-location" style={linkStyle}>Venue &amp; location guide</Link> · <Link href="/ferre-gola-nairobi-december-2026" style={linkStyle}>Ferré Gola in Nairobi</Link> · <Link href="/terms" style={linkStyle}>Terms &amp; Conditions</Link>
      </footer>
    </main>
  );
}
