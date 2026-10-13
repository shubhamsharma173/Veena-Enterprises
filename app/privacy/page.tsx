import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { business } from "@/lib/business";
export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy/" },
};
export default function Privacy() {
  return (
    <>
      <Header solid />
      <main id="main" className="container policy">
        <h1>Privacy Policy</h1>
        <p>Last updated: 13 October 2026</p>
        <p>
          This notice explains how Veena Enterprises uses information submitted
          through this website.
        </p>
        <h2>Information you share</h2>
        <p>
          When you request a callback, we collect your name, phone number,
          message and your consent to be contacted about that inquiry. Please do
          not include identity documents, payment details or other sensitive
          information.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your inquiry to contact you, understand your solar requirements
          and prepare a proposal if requested. Submitting this form does not
          sign you up for marketing.
        </p>
        <h2>Storage and service providers</h2>
        <p>
          Inquiries are stored in Cloudflare D1. We use Cloudflare to host and
          protect the website, and Resend to send inquiry notifications to our
          business email address. Cloudflare forwards that email to our Google
          Gmail inbox for handling. These providers may process data in other countries.
          Access to inquiries is restricted to people handling our customer
          requests.
        </p>
        <p>
          For abuse prevention, the system temporarily keeps a hashed network
          identifier. Cloudflare Turnstile checks form submissions and may
          process browser and network information. See{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare’s privacy policy (opens in a new tab)
          </a>
          . This site does not include advertising or analytics trackers.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          We retain inquiry details while responding to your request and for
          necessary follow-up. You can ask us to correct or delete your inquiry,
          or stop contacting you, by emailing{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>. Records
          required for a subsequent customer contract may need to be kept
          separately.
        </p>
        <h2>Contact</h2>
        <p>
          {business.name}
          <br />
          {business.address}
          <br />
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
