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
            src="/boburu/boburu_2.jpg"
            alt="FESTHER — quiet corners set among the Sri Lankan landscape"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="about-preview-panel">
          <motion.p className="gold-label" {...rise(0.1)}>
            Our story
          </motion.p>
          <motion.h2 {...rise(0.18)}>
            Born in the hills, built around one promise
          </motion.h2>
          <motion.p className="about-preview-desc" {...rise(0.26)}>
            FESTHER began in Diyatalawa with a simple idea: celebrations, getaways and journeys should feel connected.
            Instead of arranging a planner, caterer and driver separately, you can bring every moment together with one
            team that knows the hills by heart.
          </motion.p>
          <motion.p className="about-preview-desc" {...rise(0.32)}>
            From festivals and events to food, transport, stays and dining, FESTHER brings it all under one name.
            Today, you can stay at Station Hill, dine with us and explore what&rsquo;s next.
          </motion.p>
          <motion.div className="about-preview-quote" {...rise(0.36)}>
            <blockquote className="about-preview-quote-text">
              &ldquo;Whatever the letter, the standard is the same &mdash; a moment handled so well that you are
              free to enjoy it.&rdquo;
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