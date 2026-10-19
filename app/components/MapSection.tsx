import { GOOGLE_MAP_EMBED_URL } from "@/lib/contact";

/**
 * Full-width Google Maps section for the FESTHER location.
 */
export default function MapSection() {
  return (
    <section className="fh-map" aria-label="FESTHER location map">
      <div className="fh-map-frame">
        <iframe
          className="fh-map-iframe"
          src={GOOGLE_MAP_EMBED_URL}
          title="FESTHER location on Google Maps"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}