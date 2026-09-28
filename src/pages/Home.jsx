import { Link } from "react-router-dom";
import { useMemo } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home() {
  const { products, loading } = useProducts();

  const featured = useMemo(
    () => products.slice(0, 8),
    [products]
  );

  const categories = [
    ["💻", "Technology", "Smart devices & electronics"],
    ["👗", "Fashion", "Trendy everyday styles"],
    ["🏠", "Home", "Upgrade your living space"],
    ["💄", "Beauty", "Personal care essentials"],
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            ✦ THE FUTURE OF SHOPPING
          </span>

          <h1>
            Discover products
            <span> made for you.</span>
          </h1>

          <p>
            Explore a curated world of products,
            designed around the way you live, work
            and create.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              Explore Products →
            </Link>

            <Link to="/about" className="secondary-button">
              Discover Nexora
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>30+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>4.8★</strong>
              <span>Customer rating</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-one">
            <span>🔥</span>
            <div>
              <strong>Trending</strong>
              <small>New arrivals</small>
            </div>
          </div>

          <div className="hero-orb">
            <span>✦</span>
          </div>

          <div className="floating-card card-two">
            <span>✓</span>
            <div>
              <strong>Secure</strong>
              <small>Shopping experience</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SHOP BY CATEGORY</span>
            <h2>Find your world</h2>
          </div>

          <Link to="/products">View all →</Link>
        </div>

        <div className="category-grid">
          {categories.map(([icon, title, description]) => (
            <Link
              to={`/products?category=${title.toLowerCase()}`}
              className="category-card"
              key={title}
            >
              <span className="category-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Featured products</h2>
          </div>

          <Link to="/products">See all products →</Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
              />
            ))}
          </div>
        )}
      </section>

      <section className="experience-banner">
        <div>
          <span className="eyebrow">THE NEXORA PROMISE</span>
          <h2>Shopping should feel effortless.</h2>
          <p>
            Beautiful products, simple discovery and
            an experience designed around you.
          </p>
        </div>

        <Link to="/products" className="primary-button">
          Start Shopping →
        </Link>
      </section>
    </main>
  );
}