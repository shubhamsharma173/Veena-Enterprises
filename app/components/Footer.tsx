import Link from "next/link";
import { business } from "@/lib/business";
export default function Footer() {
  return (
    <footer className="footer section-band">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <Link className="brand" href="/#home">
              VEENA ENTERPRISES<small>SOLAR SERVICES</small>
            </Link>
            <p>
              Solar panel installation and solar services in Jaipur. We help you
              go green while saving money on your electricity bills.
            </p>
          </div>
          <div>
            <h2>Quick Links</h2>
            <nav aria-label="Footer navigation">
              <Link href="/#home">Home</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#why-choose-us">Why Choose Us</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>
          <div>
            <h2>Our Services</h2>
            <nav aria-label="Our services">
              <Link href="/#services">Solar Panel Installation</Link>
              <Link href="/#services">On-Grid & Off-Grid Systems</Link>
              <Link href="/#services">Solar Inverters & Batteries</Link>
              <Link href="/#services">Maintenance & AMC Services</Link>
            </nav>
          </div>
        </div>
        <div className="footer-contact">
          <div>
            <h2>Visit Us</h2>
            <a href={business.maps} target="_blank" rel="noopener noreferrer">
              {business.address}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div>
            <h2>Email Us</h2>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
          <div>
            <h2>Call Us</h2>
            <a href={`tel:${business.phone}`}>{business.displayPhone}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Veena Enterprises Solar Services. All
            rights reserved.
          </p>
          <nav aria-label="Legal">
            <Link href="/privacy/">Privacy Policy</Link>
            <Link href="/terms/">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
