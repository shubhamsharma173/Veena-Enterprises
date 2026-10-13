"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Photo from "./Photo";
const features = [
  [
    "Government Subsidy Assistance",
    "We help you navigate and apply for government solar subsidies. Eligibility and approval depend on the applicable scheme.",
  ],
  [
    "High-Quality Panels with Warranty",
    "Solar panel and inverter options with manufacturer warranties explained clearly in your proposal.",
  ],
  [
    "Cost-Effective & Timely Solutions",
    "A system planned around your electricity use, roof and budget, with an agreed installation schedule.",
  ],
];
export default function WhyChooseUs() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 48),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section id="why-choose-us" className="why section-band section-pad">
      <div className="container">
        <div className="why-heading">
          <span className="eyebrow">Why Choose Us</span>
          <h2>
            We are committed to providing the{" "}
            <span className="blue">best solar solutions</span> with exceptional
            service quality and customer satisfaction.
          </h2>
        </div>
        <div className="why-layout">
          <Photo
            name="why-choose-us"
            alt="Solar technician wearing a safety helmet and reflective vest beside solar panels"
            className="why-photo"
            sizes="(max-width: 767px) 90vw, 464px"
          />
          <div
            className="feature-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Reasons to choose Veena Enterprises"
          >
            {/* This scroll region must be focusable for native keyboard scrolling. */}
            <div
              ref={track}
              id="feature-track"
              className="feature-track"
              role="group"
              tabIndex={0}
              aria-label="Benefits. Scroll horizontally or use the previous and next buttons."
              onScroll={(e) => {
                const el = e.currentTarget;
                setPosition(
                  el.scrollLeft < 4
                    ? 0
                    : el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
                      ? 2
                      : 1,
                );
              }}
            >
              {features.map(([title, body], i) => (
                <article
                  className="feature"
                  key={title}
                  aria-label={`${i + 1} of 3`}
                >
                  <span className="feature-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="carousel-controls">
              <button
                type="button"
                aria-label="Previous benefit"
                aria-controls="feature-track"
                disabled={position === 0}
                onClick={() => move(-1)}
              >
                <ArrowLeft size={19} />
              </button>
              <button
                type="button"
                aria-label="Next benefit"
                aria-controls="feature-track"
                disabled={position === 2}
                onClick={() => move(1)}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
