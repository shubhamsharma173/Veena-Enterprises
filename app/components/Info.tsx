import { business } from "@/lib/business";
import Photo from "./Photo";
export default function Info() {
  return (
    <section className="info section-band" aria-labelledby="info-title">
      <Photo
        name="solar-panel"
        alt=""
        className="section-background"
        sizes="100vw"
      />
      <div className="container info-panel">
        <div>
          <span className="eyebrow">Contact Info</span>
          <h2 id="info-title">
            We are always
            <br /> happy to assist you
          </h2>
        </div>
        <div className="info-detail">
          <h3>Email Us</h3>
          <a className="contact-link" href={`mailto:${business.email}`}>
            {business.email}
          </a>
          <p>
            Assistance hours:
            <br />
            {business.hours}
          </p>
        </div>
        <div className="info-detail">
          <h3>Visit Us</h3>
          <a className="contact-link" href={`tel:${business.phone}`}>
            {business.displayPhone}
          </a>
          <a
            className="address-link"
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            {business.address}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
