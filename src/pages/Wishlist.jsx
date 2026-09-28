import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const products = useSelector(
    (state) => state.wishlist.items
  );

  return (
    <main className="page">
      <div className="page-header">
        <span className="eyebrow">YOUR COLLECTION</span>
        <h1>Wishlist</h1>
        <p>
          Keep the products you love in one beautiful
          place.
        </p>
      </div>

      {products.length === 0 ? (
        <>
          <EmptyState
            icon="♡"
            title="Your wishlist is empty"
            message="Save products you love and find them here later."
          />

          <div className="center-button">
            <Link to="/products" className="primary-button">
              Discover Products →
            </Link>
          </div>
        </>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}