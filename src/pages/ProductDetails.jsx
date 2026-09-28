import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import useProducts from "../hooks/useProducts";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] =
    useState(0);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <main className="page">
        <div className="empty-state">
          <div className="empty-icon">404</div>
          <h2>Product not found</h2>
          <Link to="/products" className="primary-button">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <main className="page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="details-layout">
        <div className="gallery">
          <div className="main-image">
            <img
              src={images[selectedImage]}
              alt={product.title}
            />
          </div>

          <div className="thumbnail-list">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={image}
                className={
                  selectedImage === index
                    ? "selected"
                    : ""
                }
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="details-rating">
            ⭐ {product.rating} · {product.reviews?.length || 0} reviews
          </div>

          <div className="details-price">
            ${product.price}
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="feature-list">
            <div>✓ {product.shippingInformation || "Fast shipping"}</div>
            <div>✓ {product.warrantyInformation || "Quality guaranteed"}</div>
            <div>✓ {product.returnPolicy || "Easy returns"}</div>
          </div>

          <div className="stock-info">
            <span>Stock</span>
            <strong>{product.stock} units</strong>
          </div>

          <button
            className="primary-button full-button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart →
          </button>
        </div>
      </section>
    </main>
  );
}