"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Music2, ShieldCheck, Ticket, Menu, X, ChevronDown } from "lucide-react";

const tickets = [
  { name: "Regular", price: 5000, note: "General admission" },
  { name: "VIP", price: 10000, note: "Premium festival access" },
  { name: "VVIP", price: 25000, note: "Elevated festival experience" },
  { name: "Table of 4", price: 100000, note: "Reserved table for four" },
  { name: "Table of 8", price: 200000, note: "Reserved table for eight" }
];

const lineup = ["Ferré Gola", "Prince Indah", "Johnny Junior", "Les Wanyika", "Special guest DJs"];

const money = (value: number) => new Intl.NumberFormat("en-KE", {
  style: "currency", currency: "KES", maximumFractionDigits: 0
}).format(value);

export default function Home() {
  const [selected, setSelected] = useState("Regular");
  const [quantity, setQuantity] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const chosen = useMemo(() => tickets.find((item) => item.name === selected) ?? tickets[0], [selected]);
  const total = chosen.price * quantity;

  return (
    <main>
      <div className="announcement">THE COUNTDOWN TO AN UNFORGETTABLE EXPERIENCE IS ON</div>
      <header className="nav-wrap">
        <a className="brand" href="#" aria-label="Dala Festival home"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a>
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMobileOpen(false)}>The festival</a>
          <a href="#lineup" onClick={() => setMobileOpen(false)}>Lineup</a>
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

      <section className="section about-section" id="about">
        <div className="section-kicker">01 — THE EXPERIENCE</div>
        <div className="about-grid"><h2>MORE THAN<br />A SHOW. <em>A MOVEMENT.</em></h2><div><p className="lead">A meeting place for music lovers, culture shapers and everyone who lives for the moment.</p><p className="muted">Come together for a full festival experience in Nairobi. From the first beat to the final encore, Dala Festival brings people together through sound, celebration and shared memories.</p><div className="stat-row"><div><b>01</b><small>BIG STAGE</small></div><div><b>05+</b><small>PERFORMERS</small></div><div><b>∞</b><small>MEMORIES</small></div></div></div></div>
      </section>

      <section className="lineup-section" id="lineup"><div className="section"><div className="section-kicker">02 — THE SOUNDTRACK</div><div className="lineup-head"><h2>THE<br /><em>LINEUP.</em></h2><p>Get ready for a powerful mix of live performances and DJ sets. Artist appearances and running order are subject to organiser confirmation.</p></div><div className="lineup-list">{lineup.map((artist, i) => <div className="artist-row" key={artist}><span className="artist-number">0{i + 1}</span><span className="artist-name">{artist}</span><span className="artist-type">{i === 0 ? "HEADLINER" : i === 4 ? "DJ SETS" : "LIVE PERFORMANCE"}</span><Music2 className="artist-icon" /></div>)}</div></div></section>

      <section className="tickets-section section" id="tickets">
        <div className="section-kicker">03 — MAKE IT YOURS</div><div className="tickets-head"><h2>YOUR NIGHT.<br /><em>YOUR TICKET.</em></h2><p>Choose your experience and reserve your place. Secure checkout will be enabled once payment credentials and event inventory are configured.</p></div>
        <div className="ticket-layout"><div className="ticket-options">{tickets.map((ticket, i) => <button key={ticket.name} className={selected === ticket.name ? "ticket-option active" : "ticket-option"} onClick={() => setSelected(ticket.name)}><span className="ticket-index">0{i + 1}</span><span className="ticket-info"><b>{ticket.name}</b><small>{ticket.note}</small></span><strong>{money(ticket.price)}</strong><span className="radio-dot" /></button>)}</div>
          <aside className="order-card"><div className="order-top"><span>YOUR SELECTION</span><Ticket /></div><h3>{chosen.name}</h3><p>{chosen.note}</p><div className="order-divider" /><div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><b>{quantity}</b><button onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button></div></div><div className="total-row"><span>Total</span><strong>{money(total)}</strong></div><button className="checkout-button" onClick={() => document.getElementById("checkout-note")?.scrollIntoView({behavior:"smooth"})}>Continue <ArrowRight size={18} /></button><div className="secure-note"><ShieldCheck size={15} /> M-Pesa & PayPal planned for checkout</div></aside>
        </div>
        <div className="checkout-note" id="checkout-note"><b>Online checkout is being prepared.</b><span>We are setting up secure M-Pesa and PayPal payment verification. No payment is collected on this preview.</span></div>
      </section>

      <section className="event-strip"><div><CalendarDays /><span><small>DATE</small><b>12 DECEMBER 2026</b></span></div><div><MapPin /><span><small>LOCATION</small><b>ASK Arena, Nairobi Showground</b></span></div><div><Ticket /><span><small>TICKET OPTIONS</small><b>From KSh 5,000</b></span></div></section>

      <section className="faq-section section" id="faq"><div className="section-kicker">04 — GOOD TO KNOW</div><h2>THE <em>DETAILS.</em></h2><div className="faq-list"><details><summary>Which payment methods will be available?<ChevronDown /></summary><p>At launch, the planned payment options are M-Pesa and PayPal. Checkout will only go live after payment verification has been tested.</p></details><details><summary>Will I receive a QR or PDF ticket?<ChevronDown /></summary><p>Not in the first release. The initial version will use an order reference and payment confirmation. QR and PDF delivery are planned for a later phase.</p></details><details><summary>Where is the event taking place?<ChevronDown /></summary><p>The current event listing states ASK Arena at Nairobi Showground. Please confirm final venue details with the organiser before travelling.</p></details><details><summary>Is this the event organiser's official website?<ChevronDown /></summary><p>This is an independent ticketing and event-promotion platform. It is not represented as the organiser's own website.</p></details></div></section>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>DALA<span className="brand-light"> FESTIVAL</span><small>TICKETING & EXPERIENCES</small></span></a><p>Independent event promotion & ticketing platform.</p><div>© 2026 Dala Festival Ticketing. All rights reserved.</div></footer>
    </main>
  );
}
