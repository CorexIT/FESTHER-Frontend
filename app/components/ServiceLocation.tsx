import { CONTACT_INFO, GOOGLE_MAPS_DIRECTIONS_URL } from "@/lib/contact";
import MapSection from "./MapSection";

/**
 * Location block for a service page (currently the Festival service).
 * Reuses the shared contact configuration (address) and the single map embed
 * from `lib/contact.ts`, so no location details are duplicated or hard-coded.
 */
export default function ServiceLocation() {
  return (
    <section className="service-location" aria-labelledby="service-location-title">
      <div className="service-container">
        <p className="service-eyebrow">Find us</p>
        <h2 id="service-location-title">Where to find us</h2>
        <p className="service-location-address">{CONTACT_INFO.address}</p>
        <div className="service-location-actions">
          <a
            className="service-location-btn"
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <MapSection />
    </section>
  );
}
