import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { business } from "@/lib/business";
export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms/" },
};
export default function Terms() {
  return (
    <>
      <Header solid />
      <main id="main" className="container policy">
        <h1>Terms of Service</h1>
        <p>Last updated: 12 October 2026</p>
        <h2>Website inquiries</h2>
        <p>
          This website provides information about our solar services in Jaipur.
          Sending an inquiry requests a conversation; it is not an order,
          payment or binding installation agreement.
        </p>
        <h2>Quotes and installations</h2>
        <p>
          System design, pricing, expected generation, installation timing and
          service terms depend on a site assessment and a written proposal.
          Savings depend on your electricity usage, tariff, roof conditions,
          system performance and other factors.
        </p>
        <h2>Subsidies and warranties</h2>
        <p>
          Government incentives depend on eligibility, current scheme rules and
          approval by the relevant authority. We do not guarantee subsidy
          approval. Product warranties and maintenance coverage depend on the
          manufacturer and the terms included in your agreed proposal.
        </p>
        <h2>Website content</h2>
        <p>
          Images illustrate solar services and do not necessarily show
          installations completed by Veena Enterprises. Please contact us for
          project references and current product information.
        </p>
        <h2>Contact</h2>
        <p>
          For questions, email{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> or call{" "}
          <a href={`tel:${business.phone}`}>{business.displayPhone}</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
