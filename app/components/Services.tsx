import { Sun, Zap, Settings, Wrench } from "lucide-react";
import Photo from "./Photo";
const services = [
  {
    title: "Solar Panel Installation",
    body: "Professional installation of high-quality solar panels for residential and commercial properties.",
    Icon: Sun,
  },
  {
    title: "On-Grid & Off-Grid Systems",
    body: "Complete solar power solutions including grid-tied and standalone systems.",
    Icon: Zap,
  },
  {
    title: "Solar Inverters & Batteries",
    body: "Premium solar inverters and battery systems for optimal energy storage.",
    Icon: Settings,
  },
  {
    title: "Maintenance & AMC Services",
    body: "Comprehensive maintenance and Annual Maintenance Contract services.",
    Icon: Wrench,
  },
];
function Card({ index }: { index: number }) {
  const { title, body, Icon } = services[index];
  return (
    <article className="service-card">
      <span className="service-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
export default function Services() {
  return (
    <section id="services" className="services section-pad">
      <div className="container">
        <span className="eyebrow">Our Services</span>
        <div className="services-heading">
          <h2>
            Power Your <span className="blue">Home</span> with
            <br /> Solar Energy
          </h2>
          <p>
            Comprehensive solar solutions to meet all your renewable energy
            needs. From installation to maintenance, we’ve got you covered.
          </p>
        </div>
        <div className="service-row">
          <Card index={0} />
          <Photo
            name="service-house"
            alt="A home at dusk"
            className="service-photo"
            sizes="(max-width: 767px) 90vw, (max-width: 1100px) 40vw, 462px"
          />
          <Card index={1} />
        </div>
        <div className="service-row service-row-offset">
          <Card index={2} />
          <Photo
            name="service-solarfarm"
            alt="Solar panels and wind turbines generating renewable energy"
            className="service-photo"
            sizes="(max-width: 767px) 90vw, (max-width: 1100px) 40vw, 462px"
          />
          <Card index={3} />
        </div>
      </div>
    </section>
  );
}
