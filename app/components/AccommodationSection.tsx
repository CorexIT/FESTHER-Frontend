"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Accommodation } from "@/lib/types";
import { getAccommodations } from "@/services/accommodations.service";
import { formatPrice } from "@/lib/format";
import { Icons } from "./AccommodationIcons";
import BookingModal from "./offers/BookingModal";
import { useHorizontalScroll } from "./useHorizontalScroll";
import "./horizontal-scroll.css";

function slideStep(viewport: HTMLElement | null): number {
  if (!viewport) return 320;
  const slide = viewport.querySelector<HTMLElement>(":scope > *");
  if (!slide) return Math.max(240, viewport.clientWidth * 0.8);
  const gap = parseFloat(getComputedStyle(viewport).columnGap || "0") || 0;
  return slide.getBoundingClientRect().width + gap;
}

export default function AccommodationSection() {
  const [rooms, setRooms] = useState<Accommodation[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Accommodation | null>(null);
  const [page, setPage] = useState(1);
  const { ref, dragging, prev, next, onPointerDown, onPointerMove, endDrag } =
    useHorizontalScroll();

  const updatePage = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const step = slideStep(el);
    if (!step) return;
    const i = Math.round(el.scrollLeft / step);
    setPage(Math.min(Math.max(i + 1, 1), rooms.length));
  }, [ref, rooms.length]);

  useEffect(() => {
    let cancelled = false;
    getAccommodations()
      .then((data) => {
        if (cancelled) return;
        setRooms(data);
        setStatus("ready");
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        setError(reason instanceof Error ? reason.message : "We could not load accommodation.");
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    updatePage();
    window.addEventListener("resize", updatePage);
    return () => window.removeEventListener("resize", updatePage);
  }, [updatePage]);

  const goPrev = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Wrap around at the start without breaking native scrolling.
    if (el.scrollLeft <= 4) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }
    prev();
  }, [prev, ref]);

  const goNext = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Wrap around at the end without breaking native scrolling.
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    next();
  }, [next, ref]);

  return (
    <section className="acc-section" id="stay">
      <div className="acc-head">
        <motion.h2
          className="acc-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Accommodation
        </motion.h2>
        <Link className="acc-viewall" href="/accommodation">
          View All
        </Link>
      </div>

      {status === "loading" ? (
        <div className="acc-loading" role="status" aria-live="polite" aria-label="Loading accommodations">
          <p className="acc-loading-label">Loading accommodations…</p>
          <div className="acc-loading-track" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div className="acc-loading-card" key={item}>
                <span className="acc-loading-image" />
                <span className="acc-loading-line acc-loading-line--title" />
                <span className="acc-loading-line" />
                <span className="acc-loading-line acc-loading-line--short" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {status === "error" ? <p className="of-state of-error-banner">{error}</p> : null}
      {status === "ready" ? <div
        ref={ref}
        className={`acc-viewport horizontal-scroll horizontal-scroll--snap${dragging ? " is-dragging" : ""}`}
        onScroll={updatePage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {rooms.map((room) => {
          const href = `/accommodation/${room.slug}`;
          return (
            <article className="acc-slide" key={room.slug}>
              <Link
                className="acc-photo-link"
                href={href}
                aria-label={`View ${room.name} details`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="acc-photo"
                  src={room.heroImage}
                  alt={`${room.name} at FESTHER`}
                  draggable={false}
                  loading="lazy"
                />
              </Link>
              <div className="acc-card">
                <h3 className="acc-room-title">
                  <Link href={href}>{room.name}</Link>
                </h3>
                <p className="acc-room-size">Room Type: {room.roomSize}</p>
                {formatPrice(room.price, room.currency) ? (
                  <p className="acc-room-price">{formatPrice(room.price, room.currency)} per night</p>
                ) : null}
                <p className="acc-room-desc">{room.shortDescription}</p>
                <div className="acc-actions">
                  <Link className="acc-action" href={href}>
                    Explore
                  </Link>
                  <span className="acc-actions-sep" aria-hidden="true" />
                  <button
                    type="button"
                    className="acc-action"
                    onClick={() => setBooking(room)}
                  >
                    Check Availability
                  </button>
                </div>
                <div className="acc-divider" />
                <ul className="acc-amenities">
                  {room.amenities.map(([key, label]) => (
                    <li key={label}>
                      {Icons[key]}
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div> : null}

      {rooms.length > 0 ? <div className="acc-nav">
        <button type="button" className="acc-arrow" onClick={goPrev} aria-label="Previous accommodation">
          ←
        </button>
        <span className="acc-counter" aria-live="polite">
          {page} / {rooms.length}
        </span>
        <button type="button" className="acc-arrow" onClick={goNext} aria-label="Next accommodation">
          →
        </button>
      </div> : null}

      {booking ? (
        <BookingModal
          accommodation={booking}
          offer={null}
          onClose={() => setBooking(null)}
        />
      ) : null}
    </section>
  );
}
