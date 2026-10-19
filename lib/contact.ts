/**
 * Single source of truth for FESTHR contact details, the map embed and social
 * links. The Contact section, the Footer and the floating WhatsApp button all
 * read from here so nothing is duplicated across components.
 *
 * Values that are not confirmed yet are left as clearly editable
 * "ADD_..." placeholders. Replace them with the real details — the UI renders
 * a contact row (or a map) automatically once a value is filled in.
 */

export const WHATSAPP_NUMBER = "94778540015";

export const WHATSAPP_DISPLAY = "077 854 0015";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CONTACT_INFO = {
  address: "FESTHER, Near Government B Holiday Bungalow, Diyathalawa, Sri Lanka",
  phone: "076 523 6340",
  email: "Infor@festherlk.com",
  whatsapp: WHATSAPP_DISPLAY,
} as const;

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const CONTACT_ROWS = [
  { key: "address", label: "Address", value: CONTACT_INFO.address, href: null },
  { key: "phone", label: "Phone", value: CONTACT_INFO.phone, href: telHref(CONTACT_INFO.phone) },
  { key: "whatsapp", label: "WhatsApp", value: CONTACT_INFO.whatsapp, href: WHATSAPP_URL, external: true },
  { key: "email", label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
] as const;

/** True once a placeholder has been replaced with a real value. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("ADD ");
}

/**
 * Google Maps embed URL used by every map on the site (the Contact page and
 * the Festival service page).
 *
 * IMPORTANT: it must be an EMBED url. A normal Google Maps page/share url
 * cannot be used in an iframe: it is served with `X-Frame-Options:
 * SAMEORIGIN` and the browser blocks it ("refused to connect"). The two
 * supported embed forms are:
 *   - the `.../maps/embed?pb=...` url produced by Google's "Embed a map"
 *     share option (used here), or
 *   - `https://www.google.com/maps?q=<address>&hl=en&z=14&output=embed`.
 *
 * This points at the verified FESTHER / StationHill location in Diyathalawa
 * and is the single source of truth for the site maps.
 */
export const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.735266157159!2d80.9606941!3d6.8020263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae471f6fcb3b617%3A0x1e497b12faee8f5!2sStationHill!5e0!3m2!1sen!2slk!4v1791103415738!5m2!1sen!2slk";

/**
 * Opens Google Maps directions to the verified FESTHER address in a new tab.
 * A normal (non-embed) maps link — used for buttons, never as an iframe src.
 */
export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`;

/** Social links are rendered only when a real URL is configured. */
export const SOCIAL_LINKS = [{ label: "WhatsApp", href: WHATSAPP_URL }];
