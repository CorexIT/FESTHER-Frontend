"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_INFO, SOCIAL_LINKS, WHATSAPP_URL } from "@/lib/contact";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const experienceLinks = [
  { label: "Festival", href: null },
  { label: "Event Planning", href: null },
  { label: "Buffet Scene", href: null },
  { label: "Tourism & Transport", href: null },
  { label: "Hotel & Villa", href: "/#stay" },
  { label: "Restaurant", href: "/#dining" },
];

const socialIcons: Record<string, React.ReactNode> = {
  WhatsApp: (
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  ),
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="fh-footer">
      <div className="fh-footer-top">
        <div className="fh-footer-grid">
          <div className="fh-footer-brand-col">
            <span className="fh-footer-brand">FESTHER</span>
            <p className="fh-footer-tagline">Stay. Dine. Celebrate. Explore Sri Lanka with FESTHER.</p>
            {SOCIAL_LINKS.length > 0 ? (
              <div className="fh-footer-social fh-footer-social--brand">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {socialIcons[social.label]}
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="fh-footer-col">
            <span className="fh-footer-col-title">Explore</span>
            <ul className="fh-footer-links">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fh-footer-col">
            <span className="fh-footer-col-title">Experiences</span>
            <ul className="fh-footer-links">
              {experienceLinks.map((link) =>
                link.href ? (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <span className="fh-footer-span">{link.label}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="fh-footer-col">
            <span className="fh-footer-col-title">Contact</span>
            <div className="fh-contact-item">
              <span className="fh-contact-label">Address</span>
              <span className="fh-contact-value">{CONTACT_INFO.address}</span>
            </div>
            <div className="fh-contact-item">
              <span className="fh-contact-label">Phone</span>
              <a className="fh-contact-value" href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, "")}`}>
                {CONTACT_INFO.phone}
              </a>
            </div>
            <div className="fh-contact-item">
              <span className="fh-contact-label">Email</span>
              <a className="fh-contact-value" href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="fh-contact-item">
              <span className="fh-contact-label">WhatsApp</span>
              <a
                className="fh-contact-value"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_INFO.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fh-footer-awards">
        <div className="fh-footer-awards-inner">
          <img
            className="fh-award fh-award--conde"
            src="/images/awards/conde-nast-traveller.svg"
            alt="Condé Nast Traveller — Gold List 2024"
          />
          <img
            className="fh-award fh-award--kayak"
            src="/images/awards/kayak.svg"
            alt="KAYAK — Travel Awards"
          />
          <img
            className="fh-award fh-award--travelife"
            src="/images/awards/travelife.svg"
            alt="Travelife — Gold Certified for Accommodation Sustainability"
          />
          <img
            className="fh-award fh-award--unesco"
            src="/images/awards/unesco.svg"
            alt="UNESCO — Sustainable Travel Pledge"
          />
          <img
            className="fh-award fh-award--srilanka"
            src="/images/awards/sri-lanka-tourism.svg"
            alt="Sri Lanka Tourism Alliance — Love Sri Lanka"
          />
        </div>
      </div>

      <div className="fh-footer-bottom">
        <div className="fh-footer-bottom-inner">
          <p className="fh-footer-copy">© 2026 FESTHER. All rights reserved.</p>
          <p className="fh-footer-copy">Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
