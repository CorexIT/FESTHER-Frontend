import Link from "next/link";

const imgs = [
  {
    src: "/festher-hero.jpg",
    alt: "StationHill Hotel & Resort villa and gardens at dusk",
  },
  {
    src: "/images/accommodation/room-1.jpg",
    alt: "A comfortable guest room at StationHill Hotel & Resort",
  },
  {
    src: "/festher-sunset-view.jpg",
    alt: "The garden terrace overlooking the Diyathalawa hills at sunset",
  },
];

export default function AccommodationSection() {
  return (
    <section className="acc-showcase" id="stay">
      <div className="acc-showcase-panel">
        <div className="acc-showcase-copy">
          <h2>StationHill Hotel &amp; Resort</h2>
          <p className="acc-showcase-sub">Diyathalawa</p>
          <p className="acc-showcase-desc">
            Experience the perfect blend of comfort, nature and authentic Sri Lankan hospitality. Relax
            in our cozy rooms, enjoy delicious food and take in the beautiful hill country views.
          </p>
          <Link href="/accommodation" className="acc-showcase-explore">
            Explore Accommodation{" "}
            <span className="acc-showcase-explore-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="acc-showcase-images">
          {imgs.map((img) => (
            <div className="acc-showcase-image" key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
