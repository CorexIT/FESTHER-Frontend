"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import PressSection from "./components/PressSection";

import AccommodationSection from "./components/AccommodationSection";
import DiningTaste from "./components/DiningTaste";

const slides = ["/festher-hero.jpg", "/festher-sunset-view.jpg"];
const experiences = [
  ["01", "Celebrations", "Festivals, private celebrations and moments designed to be remembered."],
  ["02", "Event Planning", "Weddings, birthdays and corporate occasions thoughtfully coordinated."],
  ["03", "Food Service", "Menus, catering and dining experiences for intimate and larger gatherings."],
  ["04", "Tourism & Transport", "Journeys, transfers and local experiences arranged around your stay."],
];

const Fade = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, ease: "easeOut" }}>
    {children}
  </motion.div>
);

export default function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const timer = setInterval(() => setSlide(v => (v + 1) % slides.length), 6500); return () => clearInterval(timer); }, []);
  const previous = () => setSlide(v => (v - 1 + slides.length) % slides.length);
  const next = () => setSlide(v => (v + 1) % slides.length);

  return <main className="festher-editorial">
    <section className="editorial-hero">
      <div className="editorial-slides"><AnimatePresence mode="sync">{slides.map((src, i) => i === slide && <motion.div key={src} className="editorial-slide" style={{ backgroundImage: `url(${src})` }} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1.09 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1.2 }, scale: { duration: 7 } }} />)}</AnimatePresence></div>
      <Navbar />
      <div className="hero-editorial-copy">
        <p className="gold-label">A Sri Lankan hospitality experience</p>
        <h1>Stay awhile.<br/><em>Celebrate everything.</em></h1>
        <div className="hero-editorial-bottom"><p>Thoughtful stays, memorable dining and beautifully considered experiences — brought together in one place.</p><a href="#story">Discover FESTHER <span>↓</span></a></div>
      </div>
      <div className="editorial-pager"><button onClick={previous}>←</button><span>0{slide + 1}</span><i/><span>0{slides.length}</span><button onClick={next}>→</button></div>
    </section>

    <AccommodationSection />

    <DiningTaste />

    <section className="intro-editorial" id="story">
      <Fade className="intro-number"><span>01</span><i/></Fade>
      <Fade className="intro-main"><p className="gold-label">Welcome to FESTHER</p><h2>A place for the moments<br/>you never want to <em>rush.</em></h2></Fade>
      <Fade className="intro-side"><p>FESTHER brings stays, dining and celebrations together with a warm, considered approach to hospitality. Come to rest, gather, explore or simply enjoy the time in between.</p><a className="under-link" href="/about">Our story ↗</a></Fade>
    </section>

    <section className="collection-editorial" id="stay">
      <div className="collection-copy"><p className="gold-label">Stay at FESTHER</p><h2>Find your own<br/><em>way to stay.</em></h2><p>From time shared together to quieter escapes, discover spaces made for comfort and unhurried days.</p><a className="under-link" href="#booking">Explore Hotel & Villa ↗</a></div>
      <motion.div className="collection-image collection-large" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .9 }}><img src="/festher-hero.jpg" alt="FESTHER stay"/><div><small>01 · STAY</small><strong>Hotel & Villa</strong><span>↗</span></div></motion.div>
      <motion.div className="collection-image collection-small" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9, delay: .1 }}><img src="/festher-sunset-view.jpg" alt="FESTHER private escape"/><div><small>02 · ESCAPE</small><strong>Private Moments</strong></div></motion.div>
    </section>

    <section className="statement-editorial"><p>FESTHER · SRI LANKA</p><h2>Come for the stay.<br/><em>Leave with a story.</em></h2><span>Every Moment, A Celebration</span></section>

    <section className="dine-editorial" id="dine">
      <div className="dine-photo"><img src="/festher-sunset-view.jpg" alt="Dining at FESTHER"/></div>
      <Fade className="dine-text"><p className="gold-label">Dine at FESTHER</p><h2>Good food.<br/>Better <em>together.</em></h2><p>Dining is part of the experience — relaxed meals, special gatherings and food created to bring people around the same table.</p><div className="mini-links"><span>Dine-in</span><span>Takeaway</span><span>Delivery</span><span>Event Catering</span></div><a className="dark-button" href="#booking">Explore dining ↗</a></Fade>
    </section>

    <section className="experience-editorial" id="experiences">
      <div className="experience-head"><div><p className="gold-label">Beyond the stay</p><h2>FESTHER<br/><em>Experiences.</em></h2></div><p>Stay for more than a room. Gather, celebrate and explore through experiences shaped around the occasion.</p></div>
      <div className="experience-list">{experiences.map(([n, title, text], i) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><small>{n}</small><h3>{title}</h3><p>{text}</p><span>↗</span></motion.article>)}</div>
    </section>

    <section className="offers-editorial" id="offers">
      <div className="offers-title"><p className="gold-label">Curated stays & occasions</p><h2>Offers made for<br/><em>your kind of escape.</em></h2></div>
      <div className="offer-scroll">{[["Romantic Escape","Time for two, made slower."],["Family Getaway","Space for the moments you share."],["Celebration Stay","Stay, dine and celebrate together."]].map((item, i) => <article className="offer-card" key={item[0]}><div className="offer-image"><img src={i === 1 ? "/festher-sunset-view.jpg" : "/festher-hero.jpg"} alt={item[0]}/><span>0{i+1}</span></div><small>FESTHER OFFER</small><h3>{item[0]}</h3><p>{item[1]}</p><a href="#booking">Discover ↗</a></article>)}</div>
    </section>

    <section className="gallery-editorial"><div className="gallery-title"><p className="gold-label">A glimpse of FESTHER</p><h2>See how it<br/><em>feels.</em></h2><a className="under-link" href="/gallery">View the gallery ↗</a></div><div className="gallery-mosaic"><img src="/festher-hero.jpg" alt="FESTHER property"/><img src="/festher-sunset-view.jpg" alt="FESTHER atmosphere"/></div></section>

    <section className="booking-editorial" id="booking"><div className="booking-overlay"/><Fade><p className="gold-label">Your time at FESTHER</p><h2>There is always<br/><em>something to celebrate.</em></h2><p>Plan your stay, dining experience or next memorable occasion with FESTHER.</p><a href="#contact">Start planning <span>↗</span></a></Fade></section>

    <PressSection />
  
  </main>;
}
