export default function About() {
  return (
    <main className="page">
      <section className="about-hero">
        <span className="eyebrow">ABOUT NEXORA</span>

        <h1>
          We believe shopping can be
          <span> beautifully simple.</span>
        </h1>

        <p>
          Nexora is a modern commerce experience
          created around discovery, simplicity and
          thoughtful technology.
        </p>
      </section>

      <section className="values-grid">
        <div className="value-card">
          <span>01</span>
          <h3>Simple</h3>
          <p>
            Clear navigation and effortless product
            discovery.
          </p>
        </div>

        <div className="value-card">
          <span>02</span>
          <h3>Smart</h3>
          <p>
            Technology that helps customers find what
            they need.
          </p>
        </div>

        <div className="value-card">
          <span>03</span>
          <h3>Human</h3>
          <p>
            A shopping experience designed around real
            people.
          </p>
        </div>
      </section>

      <section className="about-stats">
        <div>
          <strong>2026</strong>
          <span>Founded</span>
        </div>

        <div>
          <strong>30+</strong>
          <span>Products</span>
        </div>

        <div>
          <strong>4.8</strong>
          <span>Average rating</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Support</span>
        </div>
      </section>
    </main>
  );
}