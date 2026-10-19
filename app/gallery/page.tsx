"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getGalleryItems, type GalleryItem } from "@/services/gallery.service";

const categories = ["ALL", "ROOMS", "VIEWS", "DINING", "SPACES", "WELLNESS"] as const;
type Category = (typeof categories)[number];

interface GalleryCard {
  key: string;
  src: string;
  title: string;
  description: string;
  category: string;
}

const hero = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2400&h=1250&q=80";

const toCards = (items: GalleryItem[]): GalleryCard[] =>
  items.flatMap((item) => {
    const category = (item.category ?? "").toUpperCase();
    return (item.images ?? [])
      .filter((src) => typeof src === "string" && src.length > 0)
      .map((src, index) => ({
        key: `${item.id}-${index}`,
        src,
        title: item.title ?? "",
        description: item.description ?? "",
        category,
      }));
  });

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState<Category>("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const retry = useCallback(() => {
    setStatus("loading");
    setError("");
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getGalleryItems();
        if (cancelled) return;
        setItems(data);
        setError("");
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "We could not load the gallery. Please try again.");
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const cards = useMemo(() => toCards(items), [items]);
  const shown = useMemo(
    () => (active === "ALL" ? cards : cards.filter((c) => c.category === active)),
    [cards, active],
  );

  const step = useCallback(
    (dir: number) => {
      setLightbox((v) => (v === null ? v : (v + dir + shown.length) % shown.length));
    },
    [shown.length],
  );

  useEffect(() => {
    document.body.style.overflow = lightbox === null ? "" : "hidden";
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const current = lightbox === null ? null : shown[lightbox] ?? null;

  return (
    <main className={`gallery-page${scrolled ? " gallery-page--scrolled" : ""}`}>
      <section className="fg-hero">
        <Navbar />
        <img src={hero} alt="FESTHER — tropical mornings" />
        <h1>Gallery</h1>
      </section>

      <section className="fg-head">
        <nav className="fg-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">•</span>
          <span>Gallery</span>
        </nav>
        <p className="fg-intro">
          Moments of FESTHER, beautifully captured. Stays, tables, gardens and golden hours — a glimpse of the island
          at our own pace.
        </p>
      </section>

      <nav className="fg-filters" aria-label="Gallery categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={active === cat ? "is-active" : undefined}
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {status === "loading" ? (
        <p className="fg-state fg-loading" role="status">
          Loading the gallery…
        </p>
      ) : status === "error" ? (
        <div className="fg-state">
          <p className="fg-error-banner">{error}</p>
          <button type="button" className="fg-retry" onClick={retry}>
            Try Again
          </button>
        </div>
      ) : cards.length === 0 ? (
        <p className="fg-state fg-empty">The gallery is coming together — please check back soon.</p>
      ) : shown.length === 0 ? (
        <p className="fg-state fg-empty">No photos in this category yet.</p>
      ) : (
        <section className="fg-masonry" key={active} aria-label="Photo gallery">
          {shown.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className="fg-item"
              onClick={() => setLightbox(i)}
              aria-label={`Open image: ${item.title}`}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
              <span className="fg-item-cap">
                <span className="fg-item-title">{item.title}</span>
                <span className="fg-item-desc">{item.description}</span>
                <span className="fg-item-cat">{item.category}</span>
              </span>
            </button>
          ))}
        </section>
      )}

      {current ? (
        <div
          className="fg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (dx < -40) step(1);
            else if (dx > 40) step(-1);
          }}
        >
          <button className="fg-lb-close" type="button" onClick={() => setLightbox(null)} aria-label="Close">
            ×
          </button>
          <button className="fg-lb-btn fg-lb-prev" type="button" onClick={() => step(-1)} aria-label="Previous image">
            ←
          </button>
          <figure>
            <img src={current.src} alt={current.title} />
            <figcaption className="fg-lb-cap">
              <span className="fg-lb-cat">{current.category}</span>
              <span className="fg-lb-title">{current.title}</span>
              {current.description ? <span className="fg-lb-desc">{current.description}</span> : null}
            </figcaption>
          </figure>
          <button className="fg-lb-btn fg-lb-next" type="button" onClick={() => step(1)} aria-label="Next image">
            →
          </button>
        </div>
      ) : null}
    </main>
  );
}
