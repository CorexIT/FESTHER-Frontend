"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  ["⌂", "Comfortable", "Stays"],
  ["✦", "Curated", "Experiences"],
  ["♨", "Signature", "Dining"],
  ["♡", "Warm", "Hospitality"],
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" id="home">
        <div className="hero-shade" />
        <nav className="navbar" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="FESTHER home">
            <span className="brand-name">FESTHER</span>
            <span className="brand-tagline">Every Moment, A Celebration</span>
          </a>
          <div className="nav-links">
            <a className="active" href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#packages">Packages & Offers</a>
            <a href="#hotel">Hotel & Villa</a>
            <a href="#restaurant">Restaurant</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#booking" className="nav-cta">Book now <span>↗</span></a>
        </nav>

        <div className="hero-content">
          <motion.div className="hero-copy" initial="hidden" animate="visible">
            <motion.p custom={0.05} variants={reveal} className="eyebrow"><span /> A refined escape in Sri Lanka</motion.p>
            <motion.h1 custom={0.14} variants={reveal}>Where every stay<br /><em>becomes a story.</em></motion.h1>
            <motion.p custom={0.26} variants={reveal} className="intro">
              Slow down, settle in, and discover a place where thoughtful stays, memorable dining and warm hospitality come together naturally.
            </motion.p>
            <motion.div custom={0.38} variants={reveal} className="actions">
              <a href="#booking" className="primary-button">Book your stay <span>→</span></a>
              <a href="#hotel" className="ghost-button"><span className="play">▶</span> Discover FESTHER</a>
            </motion.div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: .45 }} className="hero-note">
            <span className="note-kicker">More than a stay</span>
            <div className="gold-line" />
            <p>A place to<br /><em>remember.</em></p>
          </motion.aside>
        </div>

        <div className="hero-bottom">
          <div className="feature-row">
            {features.map(([icon, title, sub]) => (
              <div className="feature" key={title}><span className="feature-icon">{icon}</span><p>{title}<small>{sub}</small></p></div>
            ))}
          </div>
          <div className="location"><span>⌖</span><div><small>Discover us in</small>Sri Lanka</div></div>
        </div>

        <div className="scroll-mark"><span>Scroll to explore</span><i /></div>
      </section>
    </main>
  );
}
