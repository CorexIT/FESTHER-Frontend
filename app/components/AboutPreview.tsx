"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-preview-row">
        <motion.div
          className="about-preview-media"
          initial={{ opacity: 0, y: 26, scale: 1.04 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/abotpage.png"
            alt="FESTHER hospitality, celebrations, delicious food and scenic stays at Station Hill"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="about-preview-panel">
          <motion.p className="gold-label" {...rise(0.1)}>
            About FESTHER
          </motion.p>
          <motion.h2 {...rise(0.18)}>
            Inspired by your dreams, designed for your moments
          </motion.h2>
          <motion.p className="about-preview-desc" {...rise(0.26)}>
            At FESTHER, we bring your dreams to life through creative event planning, warm hospitality, delicious
            dining and memorable journeys.
          </motion.p>
          <motion.p className="about-preview-desc" {...rise(0.32)}>
            From intimate gatherings to grand celebrations, we add a personal touch to every detail. Unwind, dine and
            celebrate at StationHill Hotel &amp; Resort, nestled in the misty hills of Diyathalawa.
          </motion.p>
          <motion.p className="about-preview-desc" {...rise(0.36)}>
            Let&rsquo;s create moments you&rsquo;ll love to remember.
          </motion.p>
          <motion.p className="about-preview-desc" {...rise(0.4)}>
            <strong>FESTHER &mdash; Every Moment, A Celebration!</strong>
          </motion.p>
          <motion.div className="about-preview-quote" {...rise(0.44)}>
            <blockquote className="about-preview-quote-text">
              &ldquo;Your dream inspires our design &mdash; every detail cared for, every moment yours to
              enjoy.&rdquo;
            </blockquote>
          </motion.div>
          <motion.div {...rise(0.44)}>
            <Link className="about-preview-cta" href="/about">
              More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}