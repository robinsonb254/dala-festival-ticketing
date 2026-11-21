"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Dala Festival 2026",
  "description": "Dala Festival 2026 in Nairobi featuring Ferré Gola, Prince Indah, Johnny Junior and Les Wanyika at ASK Arena, Nairobi Showground.",
  "startDate": "2026-12-12T14:00:00+03:00",
  "endDate": "2026-12-13T04:00:00+03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "image": [
    "https://dalafestivaltickets.com/artists/ferre-gola.jpg",
    "https://dalafestivaltickets.com/artists/prince-indah.jpg",
    "https://dalafestivaltickets.com/artists/johnny-junior.jpg"
  ],
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
  "organizer": {
    "@type": "Organization",
    "name": "Dala Festival",
    "url": "https://dalafestival.com/"
  },
  "performer": [
    { "@type": "Person", "name": "Ferré Gola" },
    { "@type": "Person", "name": "Prince Indah" },
    { "@type": "Person", "name": "Johnny Junior" },
    { "@type": "MusicGroup", "name": "Les Wanyika" }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://dalafestivaltickets.com/#tickets",
    "priceCurrency": "KES",
    "lowPrice": "5000",
    "highPrice": "200000"
  }
};


const money = (value: number) => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(value);

export default function Home() {
  const [selected, setSelected] = useState("Regular");
  const [heroArtistIndex, setHeroArtistIndex] = useState(0);
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentProvider, setPaymentProvider] = useState<"mpesa" | "paypal" | "card">("mpesa");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const checkoutInFlightRef = useRef(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = window.setInterval(() => setHeroArtistIndex((current) => (current + 1) % artists.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedArtistIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArtistIndex(null);
      if (event.key === "ArrowRight") setSelectedArtistIndex((current) => current === null ? null : (current + 1) % artists.length);
      if (event.key === "ArrowLeft") setSelectedArtistIndex((current) => current === null ? null : (current - 1 + artists.length) % artists.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArtistIndex]);

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
          checkoutInFlightRef.current = false;
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
    if (checkoutInFlightRef.current) return;
    if (customerName.trim().length < 2) {
      setCheckoutError("Please enter your full name before continuing.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!/^(?:254[17]\d{8}|0[17]\d{8}|[17]\d{8})$/.test(phoneDigits)) {
      setCheckoutError("Enter a valid Kenyan M-Pesa phone number, for example 07XXXXXXXX.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setCheckoutError("Please enter a valid email address or leave the email field empty.");
      return;
    }
    if (!termsAccepted) {
      setCheckoutError("Please accept the Terms & Conditions before continuing.");
      return;
    }
    setCheckoutError("");
    checkoutInFlightRef.current = true;
    setCheckoutLoading(true);
    setCheckoutError("");
    setCheckoutMessage("");
    setOrderReference("");
    setPaymentStatus("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(27000),
        body: JSON.stringify({
          customerName, email, phone, ticketType: selected, quantity,
          paymentProvider: paymentProvider === "mpesa" ? "mpesa" : "paypal",
          paypalCheckoutMode: paymentProvider === "card" ? "card" : "paypal",
          termsAccepted,
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
      checkoutInFlightRef.current = false;
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not be started.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }} />
      <div className="announcement">THE COUNTDOWN TO AN UNFORGETTABLE EXPERIENCE IS ON</div>
      <header className="nav-wrap">
        <a className="brand" href="#" aria-label="Dala Festival home"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a>
        <button className="menu-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="main-navigation">{mobileOpen ? <X /> : <Menu />}</button>
        <nav id="main-navigation" aria-label="Main navigation" className={mobileOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMobileOpen(false)}>The festival</a>
          <a href="#lineup" onClick={() => setMobileOpen(false)}>Lineup</a>
          <a href="#performances" onClick={() => setMobileOpen(false)}>Performances</a><a href="#video" onClick={() => setMobileOpen(false)}>Promo film</a>
          <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="#tickets" onClick={() => setMobileOpen(false)}>Tickets</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQs</a>
          <a className="nav-cta" href="#tickets" onClick={() => setMobileOpen(false)}>Get tickets <ArrowRight size={16} /></a>
        </nav>
      </header>

      <section className="hero hero-cinematic">
        <div className="hero-slideshow" aria-hidden="true">
          {artists.map((artist, index) => <div key={artist.name} className={index === heroArtistIndex ? "hero-slide active" : "hero-slide"}><img src={artist.image} alt="" loading="eager" decoding="async" /></div>)}
        </div>
        <div className="hero-image-shade" />
        <div className="hero-content hero-cinematic-content">
          <p className="eyebrow"><span /> MUSIC. CULTURE. ENERGY.</p>
          <p className="hero-pretitle">THE STARS ARE COMING TO NAIROBI</p>
          <h1>Dala Festival<br /><em>2026 in Nairobi.</em></h1>
          <p className="hero-copy">Experience Ferré Gola, Prince Indah, Johnny Junior and more at ASK Arena, Nairobi Showground on 12 December 2026. Choose your tickets and book online.</p>
          <div className="hero-meta">
            <div><CalendarDays /><span><b>12 DECEMBER 2026</b><small>Save the date</small></span></div>
            <div><MapPin /><span><b>ASK ARENA</b><small>Nairobi Showground</small></span></div>
          </div>
          <a className="primary-button" href="#tickets">Get your tickets <ArrowRight size={18} /></a>
        </div>
        <div className="hero-featured-artist" aria-live="polite" aria-atomic="true">
          <span>NOW FEATURING · 0{heroArtistIndex + 1} / 0{artists.length}</span>
          <strong>{artists[heroArtistIndex].name}</strong>
          <small>{artists[heroArtistIndex].role}</small>
        </div>
        <div className="hero-slide-progress" aria-label="Featured artists">
          {artists.map((artist, index) => <button key={artist.name} type="button" className={index === heroArtistIndex ? "active" : ""} onClick={() => setHeroArtistIndex(index)} aria-label={`Show ${artist.name}`} aria-pressed={index === heroArtistIndex} />)}
        </div>
        <div className="hero-bottom"><span>01 / THE EXPERIENCE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="ticker"><div>{Array.from({length: 4}).map((_, i) => <span key={i}>GOOD MUSIC <b>✳</b> GREAT PEOPLE <b>✳</b> PURE ENERGY <b>✳</b> DALA FESTIVAL <b>✳</b></span>)}</div></section>
      <section className="countdown-section" aria-label="Countdown to Dala Festival"><div className="countdown-label">THE DATE IS SET · 12 DECEMBER 2026</div><div className="countdown-grid">{[["DAYS", countdown.days], ["HOURS", countdown.hours], ["MINUTES", countdown.minutes], ["SECONDS", countdown.seconds]].map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></section>

      <section className="section about-section" id="about">
        <div className="section-kicker">01 — THE EXPERIENCE</div>
        <div className="about-grid"><h2>More than<br />a show. <em>A movement.</em></h2><div><p className="lead">A meeting place for music lovers, culture shapers and everyone who lives for the moment.</p><p className="muted">Come together for a full festival experience in Nairobi. From the first beat to the final encore, Dala Festival brings people together through sound, celebration and shared memories.</p><div className="stat-row"><div><b>01</b><small>BIG STAGE</small></div><div><b>05+</b><small>PERFORMERS</small></div><div><b>∞</b><small>MEMORIES</small></div></div></div></div>
      </section>

      <section className="lineup-section" id="lineup"><div className="section"><div className="section-kicker">02 — THE SOUNDTRACK</div><div className="lineup-head"><h2>The<br /><em>lineup.</em></h2><p>Meet the featured performers bringing the Dala Festival stage to life. The featured lineup includes Ferré Gola, Prince Indah and Johnny Junior, alongside Les Wanyika and special guest DJs.</p></div><div className="artist-card-grid">{artists.map((artist, i) => <article className="artist-card" key={artist.name}><div className="artist-photo-wrap"><button type="button" className="artist-photo-trigger" onClick={() => setSelectedArtistIndex(i)} aria-label={`Enlarge ${artist.name} photo`}><img src={artist.image} alt={artist.alt} loading={i === 0 ? "eager" : "lazy"} /></button><span className="artist-photo-index">0{i + 1}</span></div><div className="artist-card-info"><div><span>{artist.role}</span><h3>{artist.name}</h3></div><Music2 className="artist-icon" /></div></article>)}</div><div className="additional-acts"><span>ALSO ON THE BILL</span>{additionalActs.map((act) => <b key={act}>{act}</b>)}</div></div></section>

      <section className="artist-performances section" id="performances">
        <div className="section-kicker">03 — LIVE PERFORMANCE HIGHLIGHTS</div>
        <div className="performances-heading"><h2>Feel the<br /><em>live energy.</em></h2><p>Watch selected performances from the featured Dala Festival artists. Videos are embedded from their original YouTube channels and publishers.</p></div>
        <div className="performance-grid">
          <article className="performance-card">
            <div className="performance-frame"><iframe src="https://www.youtube-nocookie.com/embed/kBOYEghF9Ts" title="Ferré Gola — Accor Arena Live (Official Video)" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            <div className="performance-info"><span>FERRÉ GOLA · OFFICIAL ARTIST CHANNEL</span><h3>Accor Arena Live</h3><a href="https://www.youtube.com/watch?v=kBOYEghF9Ts" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
          <article className="performance-card">
            <div className="performance-frame"><iframe src="https://www.youtube-nocookie.com/embed/4L4Kc2pFBlk" title="Prince Indah live performance from Nyali, Mombasa" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            <div className="performance-info"><span>PRINCE INDAH · FREDY ENT. OFFICIAL</span><h3>Live Performance in Nyali, Mombasa</h3><a href="https://www.youtube.com/watch?v=4L4Kc2pFBlk" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
          <article className="performance-card">
            <div className="performance-frame"><iframe src="https://www.youtube-nocookie.com/embed/3_Lgf-9bhqg" title="Johnny Junior and BV Band — Full Live Performance at 2025 Luo Festival" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            <div className="performance-info"><span>JOHNNY JUNIOR · OFFICIAL ARTIST CHANNEL</span><h3>2025 Luo Festival — Full Live Performance</h3><a href="https://www.youtube.com/watch?v=3_Lgf-9bhqg" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
        </div>
      </section>

      <section className="promo-video-section" id="video">
        <div className="section promo-video-inner">
          <div className="section-kicker">03 — WATCH THE VIBE</div>
          <div className="promo-video-copy">
            <div><h2>The sound.<br /><em>The energy.</em></h2><p>Official Dala Festival promotional film.</p></div>
            <div className="video-placeholder promo-video-player">
              <iframe
                src="https://www.youtube-nocookie.com/embed/CeahvaMpxME?rel=0"
                title="Official Dala Festival 2026 promotional video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="festival-gallery section" id="gallery">
        <div className="section-kicker">04 — THE ARTISTS</div>
        <div className="gallery-heading"><h2>Faces of<br /><em>Dala.</em></h2><p>Featured artist portraits from the Dala Festival lineup.</p></div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-feature"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(0)} aria-label="Enlarge Ferré Gola photo"><img src="/artists/ferre-gola.jpg" alt="Ferré Gola featured artist photograph" loading="lazy" /></button><figcaption><span>01 / HEADLINER</span><b>Ferré Gola</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(1)} aria-label="Enlarge Prince Indah photo"><img src="/artists/prince-indah.jpg" alt="Prince Indah featured artist photograph" loading="lazy" /></button><figcaption><span>02 / LIVE PERFORMANCE</span><b>Prince Indah</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(2)} aria-label="Enlarge Johnny Junior photo"><img src="/artists/johnny-junior.jpg" alt="Johnny Junior featured artist photograph" loading="lazy" /></button><figcaption><span>03 / LIVE PERFORMANCE</span><b>Johnny Junior</b></figcaption></figure>
        </div>
      </section>

      <section className="tickets-section section" id="tickets">
        <div className="section-kicker">05 — MAKE IT YOURS</div><div className="tickets-head"><h2>Your night.<br /><em>Your ticket.</em></h2><p>Choose your experience, enter your details and pay securely using M-Pesa, PayPal or debit/credit card.</p></div>
        <div className="ticket-layout"><div className="ticket-options">{tickets.map((ticket, i) => <button type="button" key={ticket.name} aria-pressed={selected === ticket.name} className={selected === ticket.name ? "ticket-option active" : "ticket-option"} onClick={() => setSelected(ticket.name)}><span className="ticket-index">0{i + 1}</span><span className="ticket-info"><b>{ticket.name}</b><small>{ticket.note}</small></span><strong>{money(ticket.price)}</strong><span className="radio-dot" /></button>)}</div>
          <aside className="order-card"><div className="order-top"><span>YOUR SELECTION</span><Ticket /></div><h3>{chosen.name}</h3><p>{chosen.note}</p><div className="order-divider" /><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><b>{quantity}</b><button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div></div><div className="total-row"><span>Total</span><strong>{money(total)}</strong></div><div className="checkout-fields"><label>Full name<input value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" placeholder="Your full name" required /></label><label>Email (optional)<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" /></label><label>M-Pesa phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="07XXXXXXXX" required /></label></div><div className="payment-choice"><span>PAY WITH</span><label><input type="radio" name="paymentProvider" checked={paymentProvider === "mpesa"} onChange={() => setPaymentProvider("mpesa")} /> M-Pesa</label><label><input type="radio" name="paymentProvider" checked={paymentProvider === "paypal"} onChange={() => setPaymentProvider("paypal")} /> PayPal</label><label><input type="radio" name="paymentProvider" checked={paymentProvider === "card"} onChange={() => setPaymentProvider("card")} /> Debit/Credit Card</label></div><label className="terms-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} /><span>I have read and agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>.</span></label><button type="button" className="checkout-button" onClick={startCheckout} disabled={checkoutLoading || (!!orderReference && paymentStatus !== "failed")}>{checkoutLoading ? "Starting checkout..." : paymentProvider === "mpesa" ? "Pay with M-Pesa" : paymentProvider === "card" ? "Pay by Card" : "Continue to PayPal"} <ArrowRight size={18} /></button><div className="secure-note"><ShieldCheck size={15} /> Secure payment verification · M-Pesa & PayPal</div>{checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}{checkoutMessage && <div className="checkout-status" role="status"><b>{paymentStatus === "paid" ? "PAYMENT CONFIRMED" : paymentStatus === "failed" ? "PAYMENT NOT COMPLETED" : "ORDER " + orderReference}</b><span>{checkoutMessage}</span></div>}</aside>
        </div>
      </section>

      <section className="event-strip"><div><CalendarDays /><span><small>DATE</small><b>12 DECEMBER 2026</b></span></div><div><MapPin /><span><small>LOCATION</small><b>ASK Arena, Nairobi Showground</b></span></div><div><Ticket /><span><small>TICKET OPTIONS</small><b>From KSh 5,000</b></span></div></section>

      <section className="faq-section section" id="faq"><div className="section-kicker">06 — GOOD TO KNOW</div><h2>The <em>details.</em></h2><div className="faq-list"><details><summary>Which payment methods can I use?<ChevronDown /></summary><p>Pay for tickets securely using M-Pesa or PayPal.</p></details><details><summary>How do I confirm my ticket order?<ChevronDown /></summary><p>Keep your order reference and payment confirmation for your records.</p></details><details><summary>Where is Dala Festival taking place?<ChevronDown /></summary><p>Dala Festival takes place at ASK Arena, Nairobi Showground.</p></details></div></section>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a><nav className="footer-links" aria-label="Footer navigation"><a href="#about">Festival</a><a href="#lineup">Lineup</a><a href="#tickets">Tickets</a><a href="#faq">FAQs</a><a href="/terms">Terms &amp; Conditions</a></nav><div className="footer-contact"><span>CONTACT</span><a href="mailto:dalafestive@gmail.com">dalafestive@gmail.com</a></div><div>© 2026 Dala Festival Ticketing. All rights reserved.</div></footer>
      {selectedArtistIndex !== null && (
        <div className="artist-lightbox" role="dialog" aria-modal="true" aria-label={`Artist photograph: ${artists[selectedArtistIndex].name}`} onClick={() => setSelectedArtistIndex(null)}>
          <button type="button" className="artist-lightbox-close" onClick={() => setSelectedArtistIndex(null)} aria-label="Close photo">×</button>
          <button type="button" className="artist-lightbox-nav artist-lightbox-prev" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex - 1 + artists.length) % artists.length); }} aria-label="Previous artist">‹</button>
          <div className="artist-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={artists[selectedArtistIndex].image} alt={artists[selectedArtistIndex].alt} />
            <div className="artist-lightbox-caption"><span>{artists[selectedArtistIndex].role}</span><strong>{artists[selectedArtistIndex].name}</strong><small>{String(selectedArtistIndex + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}</small></div>
          </div>
          <button type="button" className="artist-lightbox-nav artist-lightbox-next" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex + 1) % artists.length); }} aria-label="Next artist">›</button>
        </div>
      )}
      </main>
    </>
  );
}
