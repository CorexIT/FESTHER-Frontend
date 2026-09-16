"use client";

import { motion } from "framer-motion";

const gallery=[
{src:"/festher-hero.jpg",title:"The FESTHER Escape",sub:"Stay",className:"gallery-wide"},
{src:"/festher-sunset-view.jpg",title:"Golden Horizons",sub:"Views",className:"gallery-landscape"},
{src:"/festher-hero.jpg",title:"Quiet Corners",sub:"Relax",className:"gallery-portrait"},
{src:"/festher-sunset-view.jpg",title:"Nature at Your Doorstep",sub:"Nature",className:"gallery-tall"},
{src:"/festher-hero.jpg",title:"Warm Hospitality",sub:"Experience",className:"gallery-square"},
{src:"/festher-sunset-view.jpg",title:"Evenings to Remember",sub:"Explore",className:"gallery-large"},
{src:"/festher-hero.jpg",title:"Made to Remember",sub:"FESTHER",className:"gallery-wide-bottom"},
];

export default function GalleryPage(){return <main className="site-shell gallery-page">
<nav className="navbar gallery-navbar" aria-label="Main navigation"><a href="/" className="brand"><span className="brand-name">FESTHER</span><span className="brand-tagline">Every Moment, A Celebration</span></a><div className="nav-links"><a href="/">Home</a><a href="/#services">Services</a><a href="/#packages">Packages & Offers</a><a href="/#hotel">Hotel & Villa</a><a href="/#restaurant">Restaurant</a><a className="active" href="/gallery">Gallery</a><a href="/#about">About</a><a href="/#contact">Contact</a></div><a href="/#booking" className="nav-cta">Book now <span>↗</span></a></nav>
<section className="gallery-section dedicated-gallery"><div className="gallery-heading"><div><p className="section-kicker">The FESTHER collection</p><h1 className="gallery-title">Moments worth<br/><em>remembering.</em></h1></div><p className="gallery-intro">Explore FESTHER through quiet mornings, beautiful surroundings, warm hospitality and golden evenings designed to stay with you long after your visit.</p></div><div className="gallery-grid">{gallery.map((item,i)=><motion.figure key={i} className={`gallery-card ${item.className}`} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65,delay:(i%3)*.08}}><img src={item.src} alt={item.title}/><figcaption><small>{item.sub}</small><span>{item.title}</span></figcaption></motion.figure>)}</div><div className="gallery-footer"><span>01 — 07</span><p>Stay · Dine · Explore · Celebrate</p><a href="/#contact">Plan your experience <b>↗</b></a></div></section>
</main>}
