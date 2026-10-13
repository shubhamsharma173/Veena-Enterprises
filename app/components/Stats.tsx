import Photo from "./Photo";
export default function Stats() {
  return (
    <section className="stats">
      <Photo
        name="solar-bg-2"
        alt=""
        className="section-background"
        sizes="100vw"
      />
      <div className="stats-shade" />
      <div className="container stats-content">
        <h2>Join the Green Revolution</h2>
        <p>
          Be a part of the sustainable future with Veena Enterprises. Reduce
          your carbon
          <br className="desktop-break" /> footprint while saving money on
          electricity bills.
        </p>
        <div className="stat-grid">
          <div className="stat-card">
            <strong>500+</strong>
            <span>
              Happy
              <br />
              Customers
            </span>
          </div>
          <div className="stat-card stat-blue">
            <strong>1K+</strong>
            <span>
              Solar Panels
              <br />
              Installed
            </span>
          </div>
          <div className="stat-card">
            <strong>5+</strong>
            <span>
              Years of
              <br />
              Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
