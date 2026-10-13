import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <Photo
        name="solar-bg"
        alt=""
        className="section-background"
        sizes="100vw"
        priority
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <h1>
          GO SOLAR, SAVE
          <br className="hero-break" /> MONEY, <span>SAVE THE PLANET!</span>
        </h1>
        <p>
          Be a part of the green revolution with Veena Enterprises, providing
          solar panel
          <br className="desktop-break" /> installation and solar services in
          Jaipur. Reduce your electricity bills and increase your energy
          independence.
        </p>
        <a className="button button-white" href="#contact">
          Get Started{" "}
          <span className="button-circle">
            <ArrowUpRight size={19} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
