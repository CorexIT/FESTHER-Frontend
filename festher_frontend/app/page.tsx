"use client";

import { motion } from "framer-motion";

const reveal = { hidden:{opacity:0,y:24}, visible:(delay=0)=>({opacity:1,y:0,transition:{duration:.8,delay,ease:[.22,1,.36,1] as const}}) };
const features=[["⌂","Comfortable","Stays"],["✦","Curated","Experiences"],["♨","Signature","Dining"],["♡","Warm","Hospitality"]];
const gallery=[
  {src:"/festher-hero.jpg",title:"The FESTHER Escape",sub:"Stay",className:"gallery-wide"},
  {src:"/festher-hero.jpg",title:"Quiet Corners",sub:"Relax",className:"gallery-landscape"},
  {src:"/festher-hero.jpg",title:"Garden Moments",sub:"Nature",className:"gallery-portrait"},
  {src:"/festher-hero.jpg",title:"Warm Hospitality",sub:"Experience",className:"gallery-tall"},
  {src:"/festher-hero.jpg",title:"Golden Evenings",sub:"Views",className:"gallery-square"},
  {src:"/festher-hero.jpg",title:"A Place to Gather",sub:"Celebrate",className:"gallery-large"},
  {src:"/festher-hero.jpg",title:"Made to Remember",sub:"FESTHER",className:"gallery-wide-bottom"},
];

export default function Home(){return <main className="site-shell">
<section className="hero" id="home"><div className="hero-shade"/><nav className="navbar" aria-label="Main navigation"><a href="#home" className="brand"><span className="brand-name">FESTHER</span><span className="brand-tagline">Every Moment, A Celebration</span></a><div className="nav-links"><a className="active" href="#home">Home</a><a href="#services">Services</a><a href="#packages">Packages & Offers</a><a href="#hotel">Hotel & Villa</a><a href="#restaurant">Restaurant</a><a href="#gallery">Gallery</a><a href="#about">About</a><a href="#contact">Contact</a></div><a href="#booking" className="nav-cta">Book now <span>↗</span></a></nav>
<div className="hero-content"><motion.div className="hero-copy" initial="hidden" animate="visible"><motion.p custom={.05} variants={reveal} className="eyebrow"><span/> A refined escape in Sri Lanka</motion.p><motion.h1 custom={.14} variants={reveal}>Where every stay<br/><em>becomes a story.</em></motion.h1><motion.p custom={.26} variants={reveal} className="intro">Slow down, settle in, and discover a place where thoughtful stays, memorable dining and warm hospitality come together naturally.</motion.p><motion.div custom={.38} variants={reveal} className="actions"><a href="#booking" className="primary-button">Book your stay <span>→</span></a><a href="#gallery" className="ghost-button"><span className="play">▶</span> Discover FESTHER</a></motion.div></motion.div><motion.aside initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:1,delay:.45}} className="hero-note"><span className="note-kicker">More than a stay</span><div className="gold-line"/><p>A place to<br/><em>remember.</em></p></motion.aside></div>
<div className="hero-bottom"><div className="feature-row">{features.map(([icon,title,sub])=><div className="feature" key={title}><span className="feature-icon">{icon}</span><p>{title}<small>{sub}</small></p></div>)}</div><div className="location"><span>⌖</span><div><small>Discover us in</small>Sri Lanka</div></div></div><div className="scroll-mark"><span>Scroll to explore</span><i/></div></section>
<section className="gallery-section" id="gallery"><div className="gallery-heading"><div><p className="section-kicker">A glimpse of FESTHER</p><h2>Moments worth<br/><em>remembering.</em></h2></div><p className="gallery-intro">From quiet mornings surrounded by nature to golden evenings shared together, discover the details that make every FESTHER experience special.</p></div><div className="gallery-grid">{gallery.map((item,i)=><motion.figure key={i} className={`gallery-card ${item.className}`} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65,delay:(i%3)*.08}}><img src={item.src} alt={item.title}/><figcaption><small>{item.sub}</small><span>{item.title}</span></figcaption></motion.figure>)}</div><div className="gallery-footer"><span>01 — 07</span><p>Stay · Dine · Explore · Celebrate</p><a href="#contact">Plan your experience <b>↗</b></a></div></section>
</main>}
