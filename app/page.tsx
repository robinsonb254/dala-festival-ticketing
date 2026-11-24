"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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


function YouTubeClickToPlay({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="youtube-click-player">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="youtube-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <span className="youtube-play-icon" aria-hidden="true">▶</span>
          <span className="youtube-play-label">PLAY VIDEO</span>
        </button>
      )}
    </div>
  );
}

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
    const requestedTicket = new URLSearchParams(window.location.search).get("ticket");
    if (!requestedTicket) return;
    const matchingTicket = tickets.find((ticket) => ticket.name.toLowerCase().replace(/\s+/g, "-") === requestedTicket.toLowerCase());
    if (matchingTicket) setSelected(matchingTicket.name);
  }, []);
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
    const eventTime = new Date("2026-12-12T14:00:00+03:00").getTime();
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
    if (paymentProvider === "mpesa") {
      const phoneDigits = phone.replace(/\D/g, "");
      if (!/^(?:254[17]\d{8}|0[17]\d{8}|[17]\d{8})$/.test(phoneDigits)) {
        setCheckoutError("Enter a valid Kenyan M-Pesa phone number, for example 07XXXXXXXX.");
        return;
      }
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
          customerName, email, ticketType: selected, quantity,
          paymentProvider: paymentProvider === "mpesa" ? "mpesa" : "paypal",
          phone: paymentProvider === "mpesa" ? phone : null,
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
      <div className="announcement">THE COUNTDOWN TO AN UNFORGETTABLE EXPERIENCE IS ON</div>
      <header className="nav-wrap">
        <a className="brand" href="#" aria-label="Dala Festival home"><Image src="/dala-festival-logo.webp" alt="Dala Festival" width={62} height={62} priority className="brand-logo" /></a>
        <button className="menu-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen} aria-controls="main-navigation">{mobileOpen ? <X /> : <Menu />}</button>
        <nav id="main-navigation" aria-label="Main navigation" className={mobileOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMobileOpen(false)}>The festival</a>
          <a href="#lineup" onClick={() => setMobileOpen(false)}>Lineup</a>
          <a href="#performances" onClick={() => setMobileOpen(false)}>Performances</a><a href="#video" onClick={() => setMobileOpen(false)}>Promo film</a>
          <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="#tickets" onClick={() => setMobileOpen(false)}>Tickets</a>
          <a href="#venue" onClick={() => setMobileOpen(false)}>Venue & travel</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQs</a>
          <a className="nav-cta" href="#tickets" onClick={() => setMobileOpen(false)}>Get tickets <ArrowRight size={16} /></a>
        </nav>
      </header>

      <section className="hero hero-cinematic">
        <div className="hero-slideshow" aria-hidden="true">
          <div className="hero-slide active"><Image src={artists[heroArtistIndex].image} alt="" fill priority sizes="100vw" quality={72} /></div>
        </div>
        <div className="hero-image-shade" />
        <div className="hero-content hero-cinematic-content">
          <p className="eyebrow"><span /> MUSIC. CULTURE. ENERGY.</p>
          <p className="hero-pretitle">THE STARS ARE COMING TO NAIROBI</p>
          <h1>Dala Festival<br /><em>2026 in Nairobi.</em></h1>
          <p className="hero-copy">Experience Ferré Gola, Prince Indah, Johnny Junior and more at ASK Arena, Nairobi Showground on 12 December 2026, from 2:00 PM until 4:00 AM on 13 December. Choose your tickets and book online.</p>
          <div className="hero-meta">
            <div><CalendarDays /><span><b>12 DECEMBER 2026</b><small>2:00 PM – 4:00 AM (13 Dec)</small></span></div>
            <div><MapPin /><span><b>ASK ARENA</b><small>Nairobi Showground · Jamhuri Park</small></span></div>
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

      <section className="lineup-section" id="lineup"><div className="section"><div className="section-kicker">02 — THE SOUNDTRACK</div><div className="lineup-head"><h2>The<br /><em>lineup.</em></h2><p>Meet the featured performers bringing the Dala Festival stage to life. The featured lineup includes Ferré Gola, Prince Indah and Johnny Junior, alongside Les Wanyika and special guest DJs.</p></div><div className="artist-card-grid">{artists.map((artist, i) => <article className="artist-card" key={artist.name}><div className="artist-photo-wrap"><button type="button" className="artist-photo-trigger" onClick={() => setSelectedArtistIndex(i)} aria-label={`Enlarge ${artist.name} photo`}><Image src={artist.image} alt={artist.alt} fill sizes="(max-width: 800px) 100vw, 33vw" quality={76} /></button><span className="artist-photo-index">0{i + 1}</span></div><div className="artist-card-info"><div><span>{artist.role}</span><h3>{artist.name}</h3></div><Music2 className="artist-icon" /></div></article>)}</div><div className="additional-acts"><span>ALSO ON THE BILL</span>{additionalActs.map((act) => <b key={act}>{act}</b>)}</div></div></section>

      <section className="artist-performances section" id="performances">
        <div className="section-kicker">03 — LIVE PERFORMANCE HIGHLIGHTS</div>
        <div className="performances-heading"><h2>Feel the<br /><em>live energy.</em></h2><p>Watch selected performances from the featured Dala Festival artists. Videos are embedded from their original YouTube channels and publishers.</p></div>
        <div className="performance-grid">
          <article className="performance-card">
            <div className="performance-frame"><YouTubeClickToPlay videoId="kBOYEghF9Ts" title="Ferré Gola — Accor Arena Live (Official Video)" /></div>
            <div className="performance-info"><span>FERRÉ GOLA · OFFICIAL ARTIST CHANNEL</span><h3>Accor Arena Live</h3><a href="https://www.youtube.com/watch?v=kBOYEghF9Ts" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
          <article className="performance-card">
            <div className="performance-frame"><YouTubeClickToPlay videoId="4L4Kc2pFBlk" title="Prince Indah live performance from Nyali, Mombasa" /></div>
            <div className="performance-info"><span>PRINCE INDAH · FREDY ENT. OFFICIAL</span><h3>Live Performance in Nyali, Mombasa</h3><a href="https://www.youtube.com/watch?v=4L4Kc2pFBlk" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
          <article className="performance-card">
            <div className="performance-frame"><YouTubeClickToPlay videoId="3_Lgf-9bhqg" title="Johnny Junior and BV Band — Full Live Performance at 2025 Luo Festival" /></div>
            <div className="performance-info"><span>JOHNNY JUNIOR · OFFICIAL ARTIST CHANNEL</span><h3>2025 Luo Festival — Full Live Performance</h3><a href="https://www.youtube.com/watch?v=3_Lgf-9bhqg" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
          </article>
        </div>
      </section>

      <section className="promo-video-section" id="video">
        <div className="section promo-video-inner">
          <div className="section-kicker">03 — WATCH THE VIBE</div>
          <div className="promo-video-copy">
            <div><h2>The sound.<br /><em>The energy.</em></h2></div>
            <div className="video-placeholder promo-video-player">
              <YouTubeClickToPlay videoId="CeahvaMpxME" title="Official Dala Festival 2026 promotional video" />
            </div>
          </div>
        </div>
      </section>

      <section className="festival-gallery section" id="gallery">
        <div className="section-kicker">04 — THE ARTISTS</div>
        <div className="gallery-heading"><h2>Faces of<br /><em>Dala.</em></h2><p>Featured artist portraits from the Dala Festival lineup.</p></div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-feature"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(0)} aria-label="Enlarge Ferré Gola photo"><Image src="/artists/ferre-gola.jpg" alt="Ferré Gola featured artist photograph" fill sizes="(max-width: 800px) 100vw, 42vw" quality={72} /></button><figcaption><span>01 / HEADLINER</span><b>Ferré Gola</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(1)} aria-label="Enlarge Prince Indah photo"><Image src="/artists/prince-indah.jpg" alt="Prince Indah featured artist photograph" fill sizes="(max-width: 800px) 100vw, 29vw" quality={72} /></button><figcaption><span>02 / LIVE PERFORMANCE</span><b>Prince Indah</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(2)} aria-label="Enlarge Johnny Junior photo"><Image src="/artists/johnny-junior.jpg" alt="Johnny Junior featured artist photograph" fill sizes="(max-width: 800px) 100vw, 29vw" quality={72} /></button><figcaption><span>03 / LIVE PERFORMANCE</span><b>Johnny Junior</b></figcaption></figure>
        </div>
      </section>

      <section className="tickets-section section" id="tickets">
        <div className="section-kicker">05 — MAKE IT YOURS</div><div className="tickets-head"><h2>Your night.<br /><em>Your ticket.</em></h2><p>Choose your experience, enter your details and pay securely using M-Pesa, PayPal or debit / credit card through PayPal.</p></div>
        <div className="ticket-layout"><div className="ticket-options">{tickets.map((ticket, i) => <button type="button" key={ticket.name} aria-pressed={selected === ticket.name} className={selected === ticket.name ? "ticket-option active" : "ticket-option"} onClick={() => setSelected(ticket.name)}><span className="ticket-index">0{i + 1}</span><span className="ticket-info"><b>{ticket.name}</b><small>{ticket.note}</small></span><strong>{money(ticket.price)}</strong><span className="radio-dot" /></button>)}</div>
          <aside className="order-card"><div className="order-top"><span>YOUR SELECTION</span><Ticket /></div><h3>{chosen.name}</h3><p>{chosen.note}</p><div className="order-divider" /><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><b>{quantity}</b><button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div></div><div className="total-row"><span>Total</span><strong>{money(total)}</strong></div><div className="checkout-fields"><label>Full name<input value={customerName} onChange={(event) => setCustomerName(event.target.value)} autoComplete="name" placeholder="Your full name" required /></label><label>Email (optional)<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" /></label>{paymentProvider === "mpesa" && <label>M-Pesa phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" placeholder="07XXXXXXXX" required /></label>}</div><div className="payment-choice"><span>PAY WITH</span><label><input type="radio" name="paymentProvider" checked={paymentProvider === "mpesa"} onChange={() => setPaymentProvider("mpesa")} /> M-Pesa</label><label><input type="radio" name="paymentProvider" checked={paymentProvider === "paypal"} onChange={() => setPaymentProvider("paypal")} /> PayPal</label><label><input type="radio" name="paymentProvider" checked={paymentProvider === "card"} onChange={() => setPaymentProvider("card")} /> Debit / Credit Card <span className="payment-hint">via PayPal</span></label></div><label className="terms-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} /><span>I have read and agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>.</span></label><button type="button" className="checkout-button" onClick={startCheckout} disabled={checkoutLoading || (!!orderReference && paymentStatus !== "failed")}>{checkoutLoading ? "Starting checkout..." : paymentProvider === "mpesa" ? "Pay with M-Pesa" : paymentProvider === "card" ? "Pay by Card" : "Continue to PayPal"} <ArrowRight size={18} /></button><div className="secure-note"><ShieldCheck size={15} /> Secure payment verification · M-Pesa & PayPal</div>{checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}{checkoutMessage && <div className="checkout-status" role="status"><b>{paymentStatus === "paid" ? "PAYMENT CONFIRMED" : paymentStatus === "failed" ? "PAYMENT NOT COMPLETED" : "ORDER " + orderReference}</b><span>{checkoutMessage}</span></div>}</aside>
        </div>
      </section>

      <section className="event-strip"><div><CalendarDays /><span><small>DATE</small><b>12 DECEMBER 2026</b></span></div><div><MapPin /><span><small>LOCATION</small><b>ASK Arena, Nairobi Showground</b><a href="https://www.google.com/maps/search/?api=1&query=ASK+Arena%2C+Nairobi+Showground%2C+Nairobi" target="_blank" rel="noreferrer">Get directions ↗</a></span></div><div><CalendarDays /><span><small>EVENT HOURS · EAT</small><b>Sat 12 Dec, 2:00 PM – Sun 13 Dec, 4:00 AM</b></span></div><div><Ticket /><span><small>TICKET OPTIONS</small><b>From KSh 5,000</b></span></div></section>

      <section className="section travel-section" id="venue">
        <div className="section-kicker">06 — PLAN YOUR JOURNEY</div>
        <div className="lineup-head">
          <h2>Find your<br /><em>way to Dala.</em></h2>
          <p>Make your way to ASK Arena at the Nairobi Showground, Jamhuri Park, off Ngong Road. The venue is approximately 10 km from Nairobi CBD.</p>
        </div>
        <div className="travel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18, marginTop: 28 }}>
          <article className="travel-card" style={{ border: "1px solid #383838", borderRadius: 16, padding: 22 }}>
            <MapPin />
            <h3>Navigate to the venue</h3>
            <p>Use Google Maps for live directions from your starting point. Search for ASK Showground / Jamhuri Park and follow the route shown on the day.</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=ASK+Showground%2C+Jamhuri+Park%2C+Nairobi" target="_blank" rel="noreferrer">Get directions ↗</a>
          </article>
          <article className="travel-card" style={{ border: "1px solid #383838", borderRadius: 16, padding: 22 }}>
            <Ticket />
            <h3>Public transport</h3>
            <p>Public transport routes serving the Jamhuri Park / Showground area include routes 24C and 111. Confirm the correct direction and final stop with the conductor before boarding.</p>
            <a href="https://moovitapp.com/index/en/public_transit-Jamhuri_park-Nairobi-site_36555654-3540" target="_blank" rel="noreferrer">Check nearby bus routes ↗</a>
          </article>
          <article className="travel-card" style={{ border: "1px solid #383838", borderRadius: 16, padding: 22 }}>
            <MapPin />
            <h3>Taxi and ride-hailing</h3>
            <p>Set your destination to ASK Showground, Jamhuri Park, Nairobi. Check the pin with your driver and agree on a convenient pick-up point for your return journey.</p>
          </article>
          <article className="travel-card" style={{ border: "1px solid #383838", borderRadius: 16, padding: 22 }}>
            <CalendarDays />
            <h3>Parking and arrival</h3>
            <p>The Agricultural Society of Kenya indicates that visitor parking is available at the showground for a charge. Event-night arrangements and fees should be confirmed with event staff. Consider arriving before the 2:00 PM start.</p>
            <a href="https://ask.co.ke/faqs/" target="_blank" rel="noreferrer">ASK visitor information ↗</a>
          </article>
        </div>
        <p className="muted" style={{ marginTop: 18 }}>Event schedule: Saturday, 12 December 2026, 2:00 PM to Sunday, 13 December 2026, 4:00 AM (EAT). Public transport services may be limited after the event ends; plan your return trip in advance.</p>
      </section>

      <section className="faq-section section" id="faq"><div className="section-kicker">06 — GOOD TO KNOW</div><h2>Frequently asked <em>questions.</em></h2><div className="faq-list"><details><summary>When is Dala Festival 2026?<ChevronDown /></summary><p>The event starts at 2:00 PM on Saturday, 12 December 2026 and runs until 4:00 AM on Sunday, 13 December 2026 (East Africa Time).</p></details><details><summary>Where is the festival taking place?<ChevronDown /></summary><p>At ASK Arena, Nairobi Showground, in the Jamhuri Park area off Ngong Road, Nairobi. Use the Venue &amp; travel guide above for directions.</p></details><details><summary>Who is performing?<ChevronDown /></summary><p>The announced lineup features Ferré Gola, Prince Indah, Johnny Junior, Les Wanyika and special guest DJs.</p></details><details><summary>What tickets are available and how much do they cost?<ChevronDown /></summary><p>Regular: KSh 5,000; VIP: KSh 10,000; VVIP: KSh 25,000; Table of 4: KSh 100,000; and Table of 8: KSh 200,000. Check the live checkout for the category and total before paying.</p></details><details><summary>How do I buy tickets online?<ChevronDown /></summary><p>Choose your ticket category and quantity in the Tickets section, enter your details, select a payment method and follow the checkout instructions.</p></details><details><summary>Which payment methods are available?<ChevronDown /></summary><p>You can pay using M-Pesa, PayPal or select Debit / Credit Card. Card payments are securely processed through PayPal.</p></details><details><summary>When is my order confirmed?<ChevronDown /></summary><p>Your order is confirmed after the payment provider verifies successful payment and the order status is updated. Keep your order reference and payment confirmation. If payment is deducted but your order is not confirmed, email dalafestive@gmail.com with your order reference.</p></details><details><summary>How do I get help with a ticket or payment?<ChevronDown /></summary><p>Email <a href="mailto:dalafestive@gmail.com">dalafestive@gmail.com</a> and include your order reference if you have one. Never share your M-Pesa PIN, PayPal password or one-time verification codes.</p></details></div></section>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a><nav className="footer-links" aria-label="Footer navigation"><a href="#about">Festival</a><a href="#lineup">Lineup</a><a href="#tickets">Tickets</a><a href="#venue">Venue & travel</a><a href="/dala-festival-2026-venue-location">Venue & location guide</a><a href="/ferre-gola-nairobi-december-2026">Ferré Gola in Nairobi</a><a href="#faq">FAQs</a><a href="/dala-festival-2026-tickets">Event guide & tickets</a><a href="/terms">Terms &amp; Conditions</a></nav><div className="footer-contact"><span>CONTACT</span><a href="mailto:dalafestive@gmail.com">dalafestive@gmail.com</a></div><div>© 2026 Dala Festival Ticketing. All rights reserved.</div></footer>
      {selectedArtistIndex !== null && (
        <div className="artist-lightbox" role="dialog" aria-modal="true" aria-label={`Artist photograph: ${artists[selectedArtistIndex].name}`} onClick={() => setSelectedArtistIndex(null)}>
          <button type="button" className="artist-lightbox-close" onClick={() => setSelectedArtistIndex(null)} aria-label="Close photo">×</button>
          <button type="button" className="artist-lightbox-nav artist-lightbox-prev" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex - 1 + artists.length) % artists.length); }} aria-label="Previous artist">‹</button>
          <div className="artist-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <Image src={artists[selectedArtistIndex].image} alt={artists[selectedArtistIndex].alt} width={1200} height={1600} sizes="76vw" quality={85} />
            <div className="artist-lightbox-caption"><span>{artists[selectedArtistIndex].role}</span><strong>{artists[selectedArtistIndex].name}</strong><small>{String(selectedArtistIndex + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}</small></div>
          </div>
          <button type="button" className="artist-lightbox-nav artist-lightbox-next" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex + 1) % artists.length); }} aria-label="Next artist">›</button>
        </div>
      )}
      </main>
    </>
  );
}
