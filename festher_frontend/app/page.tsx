"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HouseScene = dynamic(() => import("./components/HouseScene"), {
  ssr: false,
  loading: () => <div className="scene-loader">Building your view…</div>,
});

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="navbar" aria-label="Main navigation">
        <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} href="#" className="brand">FESTHER<span>.</span></motion.a>
        <div className="nav-links"><a href="#projects">Projects</a><a href="#studio">Studio</a><a href="#contact">Contact</a></div>
        <a href="#contact" className="nav-cta">Start a project <span>↗</span></a>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <motion.p custom={0.1} variants={reveal} initial="hidden" animate="visible" className="eyebrow">Architecture · Interior · Living</motion.p>
          <motion.h1 custom={0.2} variants={reveal} initial="hidden" animate="visible">Spaces shaped<br />for <em>living.</em></motion.h1>
          <motion.p custom={0.35} variants={reveal} initial="hidden" animate="visible" className="intro">We design considered homes where bold architecture and quiet comfort exist in perfect balance.</motion.p>
          <motion.div custom={0.48} variants={reveal} initial="hidden" animate="visible" className="actions">
            <a href="#projects" className="primary-button">Explore our work <span>→</span></a><a href="#studio" className="text-button">Meet the studio</a>
          </motion.div>
          <motion.div custom={0.6} variants={reveal} initial="hidden" animate="visible" className="meta-row">
            <div><strong>28</strong><span>Spaces completed</span></div><div><strong>12</strong><span>Design awards</span></div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.15 }} className="scene-wrap">
          <HouseScene />
          <div className="scene-label"><span>01</span><p>Courtyard House<br /><small>Colombo · 2026</small></p></div>
          <div className="drag-note">Move cursor to explore</div>
        </motion.div>
      </section>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="bottom-rule" />
    </main>
  );
}
