"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Music2, ShieldCheck, Ticket, Menu, X, ChevronDown } from "lucide-react";

const tickets = [
  { name: "Regular", price: 5000, note: "General admission" },
  { name: "VIP", price: 10000, note: "Premium festival access" },
  { name: "VVIP", price: 25000, note: "Elevated festival experience" },
  { name: "Table of 4", price: 100000, note: "Reserved table for four" },
  { name: "Table of 8", price: 200000, note: "Reserved table for eight" }
];

const artists = [
  { name: "Ferré Gola", role: "HEADLINER", image: "/artists/ferre-gola.jpg", alt: "Ferré Gola artist photograph" },
  { name: "Prince Indah", role: "LIVE PERFORMANCE", image: "/artists/prince-indah.jpg", alt: "Prince Indah artist photograph" },
  { name: "Johnny Junior", role: "LIVE PERFORMANCE", image: "/artists/johnny-junior.jpg", alt: "Johnny Junior artist photograph" }
];
const additionalActs = ["Les Wanyika", "Special guest DJs"];

const money = (value: number) => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(value);

export default function Home() {
  const [selected, setSelected] = useState("Regular");
  const [quantity, setQuantity] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentProvider, setPaymentProvider] = useState<"mpesa" | "paypal">("mpesa");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const eventTime = new Date("2026-12-12T00:00:00+03:00").getTime();
    const updateCountdown = () => {
      const distance = Math.max(0, eventTime - Date.now());
      setCountdown({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000)
      });
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const chosen = useMemo(() => tickets.find((item) => item.name === selected) ?? tickets[0], [selected]);
  const total = chosen.price * quantity;

  useEffect(() => {
    if (!orderReference || paymentProvider !== "mpesa" || paymentStatus === "paid" || paymentStatus === "failed") return;
    let active = true;
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/orders/" + encodeURIComponent(orderReference), { cache: "no-store" });
        const data = await response.json();
        if (!active || !response.ok || !data.order) return;
        setPaymentStatus(data.order.payment_status);
        if (data.order.payment_status === "paid") {
          setCheckoutMessage("Payment received. Your order is confirmed. Keep your order reference safe: " + orderReference);
        } else if (data.order.payment_status === "failed") {
          setCheckoutMessage("The M-Pesa payment was not completed. You can start a new checkout.");
        }
      } catch {
        // Keep polling if the status endpoint is temporarily unavailable.
      }
    };
    void checkStatus();
    const timer = window.setInterval(checkStatus, 4000);
    return () => { active = false; window.clearInterval(timer); };
  }, [orderReference, paymentProvider, paymentStatus]);

  async function startCheckout() {
    setCheckoutLoading(true);
    setCheckoutError("");
    setCheckoutMessage("");
    setOrderReference("");
    setPaymentStatus("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName, email, phone, ticketType: selected, quantity, paymentProvider,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not be started.");
      setOrderReference(data.reference);
      if (data.provider === "paypal" && data.approvalUrl) {
        window.location.assign(data.approvalUrl);
        return;
      }
      setPaymentStatus("pending");
      setCheckoutMessage(data.message || "Check your phone and complete the M-Pesa prompt.");
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not be started.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
      <div className="announcement">THE COUNTDOWN TO AN UNFORGETTABLE EXPERIENCE IS ON</div>
      <header className="nav-wrap">
        <a className="brand" href="#" aria-label="Dala Festival home"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a>
        <button className="menu-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="main-navigation">{mobileOpen ? <X /> : <Menu />}</button>
        <nav id="main-navigation" aria-label="Main navigation" className={mobileOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMobileOpen(false)}>The festival</a>
          <a href="#lineup" onClick={() => setMobileOpen(false)}>Lineup</a>
          <a href="#video" onClick={() => setMobileOpen(false)}>Watch</a>
          <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="#tickets" onClick={() => setMobileOpen(false)}>Tickets</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQs</a>
          <a className="nav-cta" href="#tickets" onClick={() => setMobileOpen(false)}>Get tickets <ArrowRight size={16} /></a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-content">
          <p className="eyebrow"><span /> MUSIC. CULTURE. ENERGY.</p>
          <h1>FEEL THE<br /><em>DALA</em> VIBE.</h1>
          <p className="hero-copy">One stage. Iconic sounds. A whole day of unforgettable moments. Nairobi, get ready.</p>
          <div className="hero-meta">
            <div><CalendarDays /><span><b>12 DECEMBER 2026</b><small>Save the date</small></span></div>
            <div><MapPin /><span><b>ASK ARENA</b><small>Nairobi Showground</small></span></div>
          </div>
          <a className="primary-button" href="#tickets">Explore tickets <ArrowRight size={18} /></a>
          <p className="hero-footnote">Independent ticketing and event promotion platform</p>
        </div>
        <div className="hero-art" aria-label="Abstract festival artwork">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="disc"><div className="disc-inner"><span>DALA</span><small>FESTIVAL 2026</small></div></div>
          <div className="art-tag tag-top">NAIROBI / KENYA</div><div className="art-tag tag-bottom">LIVE • LOUD • LEGENDARY</div>
          <div className="art-star">✳</div>
        </div>
        <div className="hero-bottom"><span>01 / THE EXPERIENCE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="ticker"><div>{Array.from({length: 4}).map((_, i) => <span key={i}>GOOD MUSIC <b>✳</b> GREAT PEOPLE <b>✳</b> PURE ENERGY <b>✳</b> DALA FESTIVAL <b>✳</b></span>)}</div></section>
      <section className="countdown-section" aria-label="Countdown to Dala Festival"><div className="countdown-label">THE DATE IS SET · 12 DECEMBER 2026</div><div className="countdown-grid">{[["DAYS", countdown.days], ["HOURS", countdown.hours], ["MINUTES", countdown.minutes], ["SECONDS", countdown.seconds]].map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></section>

      <section className="section about-section" id="about">
        <div className="section-kicker">01 — THE EXPERIENCE</div>
        <div className="about-grid"><h2>MORE THAN<br />A SHOW. <em>A MOVEMENT.</em></h2><div><p className="lead">A meeting place for music lovers, culture shapers and everyone who lives for the moment.</p><p className="muted">Come together for a full festival experience in Nairobi. From the first beat to the final encore, Dala Festival brings people together through sound, celebration and shared memories.</p><div className="stat-row"><div><b>01</b><small>BIG STAGE</small></div><div><b>05+</b><small>PERFORMERS</small></div><div><b>∞</b><small>MEMORIES</small></div></div></div></div>
      </section>

      <section className="lineup-section" id="lineup"><div className="section"><div className="section-kicker">02 — THE SOUNDTRACK</div><div className="lineup-head"><h2>THE<br /><em>LINEUP.</em></h2><p>Meet the featured performers bringing the Dala Festival stage to life. Artist appearances and running order remain subject to organiser confirmation.</p></div><div className="artist-card-grid">{artists.map((artist, i) => <article className="artist-card" key={artist.name}><div className="artist-photo-wrap"><img src={artist.image} alt={artist.alt} loading={i === 0 ? "eager" : "lazy"} /><span className="artist-photo-index">0{i + 1}</span></div><div className="artist-card-info"><div><span>{artist.role}</span><h3>{artist.name}</h3></div><Music2 className="artist-icon" /></div></article>)}</div><div className="additional-acts"><span>ALSO ON THE BILL</span>{additionalActs.map((act) => <b key={act}>{act}</b>)}</div></div></section>

      <section className="promo-video-section" id="video">
        <div className="section promo-video-inner">
          <div className="section-kicker">03 — WATCH THE VIBE</div>
          <div className="promo-video-copy">
            <div><h2>THE SOUND.<br /><em>THE ENERGY.</em></h2><p>The official Dala Festival promotional film will appear here. We are keeping this space ready for the organiser-approved video.</p></div>
            <div className="video-placeholder" role="img" aria-label="Dala Festival promotional video coming soon">
              <div className="video-orbit video-orbit-one" /><div className="video-orbit video-orbit-two" />
              <div className="video-disc"><span>DALA</span><small>FESTIVAL 2026</small></div>
              <div className="video-coming-soon">OFFICIAL PROMO FILM · COMING SOON</div>
            </div>
          </div>
        </div>
      </section>

      <section className="festival-gallery section" id="gallery">
        <div className="section-kicker">04 — THE ARTISTS</div>
        <div className="gallery-heading"><h2>FACES OF<br /><em>DALA.</em></h2><p>A first look at the featured performers. More festival moments and approved event photography will be added as they become available.</p></div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-feature"><img src="/artists/ferre-gola.jpg" alt="Ferré Gola featured artist photograph" loading="lazy" /><figcaption><span>01 / HEADLINER</span><b>Ferré Gola</b></figcaption></figure>
          <figure className="gallery-item"><img src="/artists/prince-indah.jpg" alt="Prince Indah featured artist photograph" loading="lazy" /><figcaption><span>02 / LIVE PERFORMANCE</span><b>Prince Indah</b></figcaption></figure>
          <figure className="gallery-item"><img src="/artists/johnny-junior.jpg" alt="Johnny Junior featured artist photograph" loading="lazy" /><figcaption><span>03 / LIVE PERFORMANCE</span><b>Johnny Junior</b></figcaption></figure>
        </div>
      </section>

      <section className="tickets-section section" id="tickets">
        <div className="section-kicker">05 — MAKE IT YOURS</div><div className="tickets-head"><h2>YOUR NIGHT.<br /><em>YOUR TICKET.</em></h2><p>Choose your experience, enter your details and pay securely using M-Pesa or PayPal.</p></div>
        <div className="ticket-layout"><div className="ticket-options">{tickets.map((ticket, i) => <button type="button" key={ticket.name} aria-pressed={selected === ticket.name} className={selected === ticket.name ? "ticket-option active" : "ticket-option"} onClick={() => setSelected(ticket.name)}><span className="ticket-index">0{i + 1}</span><span className="ticket-info"><b>{ticket.name}</b><small>{ticket.note}</small></span><strong>{money(ticket.price)}</strong><span className="radio-dot" /></button>)}</div>
          <aside className="order-card"><div className="order-top"><span>YOUR SELECTION</span><Ticket /></div><h3>{chosen.name}</h3><p>{chosen.note}</p><div className="order-divider" /><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><b>{quantity}</b><button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div></div><div className="total-row"><span>Total</span><strong>{money(total)}</strong></div><div className="checkout-fields"><label>Full name<input value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" placeholder="Your full name" required /></label><label>Email (optional)<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" /></label><label>M-Pesa phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="07XXXXXXXX" required /></label></div><div className="payment-choice"><span>PAY WITH</span><label><input type="radio" name="paymentProvider" checked={paymentProvider === "mpesa"} onChange={() => setPaymentProvider("mpesa")} /> M-Pesa</label><label><input type="radio" name="paymentProvider" checked={paymentProvider === "paypal"} onChange={() => setPaymentProvider("paypal")} /> PayPal</label></div><label className="terms-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} /><span>I have read and agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>.</span></label><button type="button" className="checkout-button" onClick={startCheckout} disabled={checkoutLoading || !customerName.trim() || !phone.trim() || !termsAccepted}>{checkoutLoading ? "Starting checkout..." : paymentProvider === "mpesa" ? "Pay with M-Pesa" : "Continue to PayPal"} <ArrowRight size={18} /></button><div className="secure-note"><ShieldCheck size={15} /> Secure payment verification · M-Pesa & PayPal</div>{checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}{checkoutMessage && <div className="checkout-status" role="status"><b>{paymentStatus === "paid" ? "PAYMENT CONFIRMED" : paymentStatus === "failed" ? "PAYMENT NOT COMPLETED" : "ORDER " + orderReference}</b><span>{checkoutMessage}</span></div>}</aside>
        </div>
        <div className="checkout-note" id="checkout-note"><b>Payment confirmation</b><span>Your order is only confirmed after the payment provider verifies the transaction. Keep your order reference for support. QR and PDF tickets are not included in this release.</span></div>
      </section>

      <section className="event-strip"><div><CalendarDays /><span><small>DATE</small><b>12 DECEMBER 2026</b></span></div><div><MapPin /><span><small>LOCATION</small><b>ASK Arena, Nairobi Showground</b></span></div><div><Ticket /><span><small>TICKET OPTIONS</small><b>From KSh 5,000</b></span></div></section>

      <section className="faq-section section" id="faq"><div className="section-kicker">06 — GOOD TO KNOW</div><h2>THE <em>DETAILS.</em></h2><div className="faq-list"><details><summary>Which payment methods will be available?<ChevronDown /></summary><p>At launch, the planned payment options are M-Pesa and PayPal. Checkout will only go live after payment verification has been tested.</p></details><details><summary>Will I receive a QR or PDF ticket?<ChevronDown /></summary><p>Not in the first release. The initial version will use an order reference and payment confirmation. QR and PDF delivery are planned for a later phase.</p></details><details><summary>What time does the festival begin?<ChevronDown /></summary><p>The event start time has not yet been confirmed. Check the organiser’s official updates before making travel arrangements.</p></details><details><summary>Where is the event taking place?<ChevronDown /></summary><p>The current event listing states ASK Arena at Nairobi Showground. Please confirm final venue details with the organiser before travelling.</p></details><details><summary>Is this the event organiser's official website?<ChevronDown /></summary><p>This is an independent ticketing and event-promotion platform. It is not represented as the organiser's own website.</p></details></div></section>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a><p>Independent event promotion & ticketing platform.</p><nav className="footer-links" aria-label="Footer navigation"><a href="#about">Festival</a><a href="#lineup">Lineup</a><a href="#tickets">Tickets</a><a href="#faq">FAQs</a><a href="/terms">Terms &amp; Conditions</a></nav><div className="footer-contact"><span>CONTACT</span><a href="mailto:dalafestive@gmail.com">dalafestive@gmail.com</a></div><div>© 2026 Dala Festival Ticketing. All rights reserved.</div></footer>
      </main>
    </>
  );
}
