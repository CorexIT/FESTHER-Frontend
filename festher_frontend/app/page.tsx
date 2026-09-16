"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const reveal={hidden:{opacity:0,y:24},visible:(delay=0)=>({opacity:1,y:0,transition:{duration:.8,delay,ease:[.22,1,.36,1] as const}})};
const slides=["/festher-hero.jpg","/festher-sunset-view.jpg"];
const features=[["⌂","Comfortable","Stays"],["✦","Curated","Experiences"],["♨","Signature","Dining"],["♡","Warm","Hospitality"]];

export default function Home(){
 const [slide,setSlide]=useState(0);
 useEffect(()=>{const timer=window.setInterval(()=>setSlide(v=>(v+1)%slides.length),6000);return()=>window.clearInterval(timer)},[]);
 const change=(index:number)=>setSlide((index+slides.length)%slides.length);
 return <main className="site-shell">
 <section className="hero" id="home">
  <div className="hero-slides" aria-hidden="true"><AnimatePresence initial={false}>{slides.map((src,index)=>index===slide&&<motion.div key={src} className="hero-slide" style={{backgroundImage:`url(${src})`}} initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1.1}} exit={{opacity:0}} transition={{opacity:{duration:1.35,ease:"easeInOut"},scale:{duration:7,ease:"linear"}}}/>)}</AnimatePresence></div>
  <div className="hero-shade"/>
  <nav className="navbar" aria-label="Main navigation"><a href="/" className="brand"><span className="brand-name">FESTHER</span><span className="brand-tagline">Every Moment, A Celebration</span></a><div className="nav-links"><a className="active" href="/">Home</a><a href="/#services">Services</a><a href="/#packages">Packages & Offers</a><a href="/#hotel">Hotel & Villa</a><a href="/#restaurant">Restaurant</a><a href="/gallery">Gallery</a><a href="/#about">About</a><a href="/#contact">Contact</a></div><a href="/#booking" className="nav-cta">Book now <span>↗</span></a></nav>
  <div className="hero-content"><motion.div className="hero-copy" initial="hidden" animate="visible"><motion.p custom={.05} variants={reveal} className="eyebrow"><span/> A refined escape in Sri Lanka</motion.p><motion.h1 custom={.14} variants={reveal}>Where every stay<br/><em>becomes a story.</em></motion.h1><motion.p custom={.26} variants={reveal} className="intro">Slow down, settle in, and discover a place where thoughtful stays, memorable dining and warm hospitality come together naturally.</motion.p><motion.div custom={.38} variants={reveal} className="actions"><a href="/#booking" className="primary-button">Book your stay <span>→</span></a><a href="/gallery" className="ghost-button"><span className="play">▶</span> Discover FESTHER</a></motion.div></motion.div><motion.aside initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:1,delay:.45}} className="hero-note"><span className="note-kicker">More than a stay</span><div className="gold-line"/><p>A place to<br/><em>remember.</em></p></motion.aside></div>
  <div className="hero-controls"><button onClick={()=>change(slide-1)} aria-label="Previous hero image">←</button><div className="slide-dots">{slides.map((_,i)=><button key={i} onClick={()=>change(i)} className={i===slide?"current":""} aria-label={`Show slide ${i+1}`}><span/></button>)}</div><button onClick={()=>change(slide+1)} aria-label="Next hero image">→</button><span className="slide-count">0{slide+1} / 0{slides.length}</span></div>
  <div className="hero-bottom"><div className="feature-row">{features.map(([icon,title,sub])=><div className="feature" key={title}><span className="feature-icon">{icon}</span><p>{title}<small>{sub}</small></p></div>)}</div><div className="location"><span>⌖</span><div><small>Discover us in</small>Sri Lanka</div></div></div><div className="scroll-mark"><span>Scroll to explore</span><i/></div>
 </section>
 </main>
}
