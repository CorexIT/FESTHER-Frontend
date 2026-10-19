"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import StationHillSlideshow, { type SlideshowImage } from "./StationHillSlideshow";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Photography reused from the existing StationHill / FESTHER library — no new
// artwork is introduced. Only genuine property images are used here; the
// destination photographs elsewhere on the site (waterfalls, bridges, plains)
// are deliberately excluded because they are not StationHill Hotel & Resort.
const HOTEL_IMAGES: SlideshowImage[] = [
  { src: "/images/accommodation/room-1.jpg", alt: "Garden Suite interior at StationHill Hotel & Resort" },
  { src: "/festher-hero.jpg", alt: "StationHill Hotel & Resort villa and gardens at dusk" },
  { src: "/images/accommodation/room-2.jpg", alt: "Family Suite at StationHill Hotel & Resort" },
  { src: "/festher-sunset-view.jpg", alt: "Golden-hour view over the hill country from StationHill" },
  { src: "/images/accommodation/room-3.jpg", alt: "Deluxe Room at StationHill Hotel & Resort" },
  { src: "/images/accommodation/room-4.jpg", alt: "Premier Suite at StationHill Hotel & Resort" },
  { src: "/abotpage.png", alt: "StationHill Hotel & Resort set in the Diyathalawa hills" },
];

const icon = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const features: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: icon(
      <>
        <circle cx="6.8" cy="9.2" r="1.5" />
        <circle cx="10.2" cy="6.6" r="1.5" />
        <circle cx="14" cy="6.6" r="1.5" />
        <circle cx="17.4" cy="9.2" r="1.5" />
        <path d="M12 11.4c-2.1 0-3.8 1.6-3.8 3.4 0 1.7 1.3 2.7 3.8 2.7s3.8-1 3.8-2.7c0-1.8-1.7-3.4-3.8-3.4Z" />
      </>
    ),
    title: "Pet Friendly",
    text: "Make beautiful memories with your four-legged companions. Enjoy a welcoming getaway with your pets.",
  },
  {
    icon: icon(
      <>
        <path d="M8 3h8l-.8 5.9A3.6 3.6 0 0 1 12 12a3.6 3.6 0 0 1-3.2-3.1L8 3Z" />
        <path d="M12 12v5.5" />
        <path d="M9 20.5h6" />
      </>
    ),
    title: "Bring Your Own Bottle",
    text: "Bring your preferred beverages and enjoy relaxing moments with friends and family in our peaceful hill-country setting.",
  },
  {
    icon: icon(
      <>
        <path d="M12 3c2.4 3.1 3.6 5.3 3.6 7.2A3.6 3.6 0 0 1 8.4 10.2C8.4 8.3 9.6 6.1 12 3Z" />
        <path d="M12 11.6c1 1.1 1.6 1.9 1.6 2.7a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.6 1.6-2.7Z" />
      </>
    ),
    title: "BBQ Experiences",
    text: "Enjoy relaxed BBQ moments with family and friends, surrounded by the refreshing atmosphere of Diyathalawa.",
  },
  {
    icon: icon(
      <>
        <rect x="2.5" y="14" width="14" height="4.5" rx="1" />
        <path d="M16.5 14h5v4.5h-5" />
        <path d="M6.5 10.4c1.2-.7 1.9-1.7 1.9-3" />
        <path d="M10.3 10.4c1.2-.7 1.9-1.7 1.9-3" />
      </>
    ),
    title: "Designated Smoking Area",
    text: "Enjoy the convenience of a designated smoking space while keeping shared guest areas comfortable.",
  },
  {
    icon: icon(
      <>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </>
    ),
    title: "Food & Dining",
    text: "Discover freshly prepared meals, delicious local flavours and satisfying dining experiences at StationHill Hotel & Resort.",
  },
];

export default function StationHillIntro() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const divider = (delay: number) => (
    <motion.span className="sh-divider" aria-hidden="true" {...rise(delay)}>
      <svg
        viewBox="0 0 180 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d="M2 15H70" />
        <path d="M110 15H178" />
        <path d="M72 15l10-11 8 8 8-6 8 9" />
      </svg>
    </motion.span>
  );

  return (
    <div className="sh-wrap">
      <section className="sh-intro" aria-labelledby="sh-intro-title">
        <div className="sh-intro-inner">
          <motion.p className="sh-eyebrow" {...rise(0)}>
            Welcome to StationHill
          </motion.p>
          <motion.h2 id="sh-intro-title" className="sh-title" {...rise(0.08)}>
            A Peaceful Escape in the Heart of Diyathalawa
          </motion.h2>
          {divider(0.12)}
          <div className="sh-copy">
            <motion.p {...rise(0.16)}>
              Welcome to StationHill Hotel &amp; Resort, a charming hill-country retreat nestled in the peaceful
              surroundings of Diyathalawa, Sri Lanka. Surrounded by refreshing mountain air, natural beauty and a
              relaxing atmosphere, StationHill offers a welcoming place to escape the everyday rush.
            </motion.p>
            <motion.p {...rise(0.22)}>
              Whether you&rsquo;re planning a romantic getaway, a family holiday, a gathering with friends or a peaceful
              weekend retreat, our comfortable accommodation and warm Sri Lankan hospitality make every stay feel
              special.
            </motion.p>
            <motion.p {...rise(0.28)}>
              Enjoy delicious meals, spend quality time with loved ones and experience the quiet charm of Sri
              Lanka&rsquo;s beautiful hill country. At StationHill, every visit is an opportunity to relax, reconnect and
              create lasting memories.
            </motion.p>
          </div>
        </div>
        <motion.div className="sh-intro-media" {...rise(0.14)}>
          <StationHillSlideshow images={HOTEL_IMAGES} />
        </motion.div>
      </section>

      <section className="sh-features" aria-labelledby="sh-features-title">
        <div className="sh-features-head">
          <motion.p className="sh-eyebrow" {...rise(0)}>
            Experience StationHill
          </motion.p>
          <motion.h2 id="sh-features-title" className="sh-title" {...rise(0.08)}>
            Thoughtful Comforts, Memorable Moments
          </motion.h2>
          {divider(0.12)}
          <motion.p className="sh-features-desc" {...rise(0.16)}>
            Discover the little things that make your stay more comfortable, enjoyable and memorable.
          </motion.p>
        </div>
        <div className="sh-feature-grid">
          {features.map((feature, index) => (
            <motion.div className="sh-feature" key={feature.title} {...rise(0.08 * index)}>
              <span className="sh-feature-icon">{feature.icon}</span>
              <h3 className="sh-feature-title">{feature.title}</h3>
              <p className="sh-feature-text">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
