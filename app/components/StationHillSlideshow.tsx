/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import { useReducedMotion } from "framer-motion";

export type SlideshowImage = {
  src: string;
  alt: string;
};

const AUTOPLAY_MS = 4000;

export default function StationHillSlideshow({ images }: { images: SlideshowImage[] }) {
  const reduce = useReducedMotion();
  const count = images.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (reduce || paused || hidden || count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduce, paused, hidden, count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 45) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="sh-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="StationHill Hotel &amp; Resort photographs"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="sh-slides">
        {images.map((image, i) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`sh-slide${i === index ? " is-active" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            aria-hidden={i === index ? undefined : true}
          />
        ))}
      </div>

      <button
        type="button"
        className="sh-slide-nav sh-slide-nav--prev"
        onClick={prev}
        aria-label="Previous photograph"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5 8 12l7 7" />
        </svg>
      </button>
      <button
        type="button"
        className="sh-slide-nav sh-slide-nav--next"
        onClick={next}
        aria-label="Next photograph"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="sh-dots" role="tablist" aria-label="Choose a photograph">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Photograph ${i + 1} of ${count}`}
            className={`sh-dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <p className="sh-sr" aria-live="polite">
        {`Photograph ${index + 1} of ${count}: ${images[index].alt}`}
      </p>
    </div>
  );
}
