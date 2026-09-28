import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const discount = Math.round(product.discountPercentage || 0);

  return (
    <article className="product-card">
      <div className="product-image">
        {discount > 0 && (
          <span className="discount-badge">
            -{discount}%
          </span>
        )}

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => dispatch(toggleWishlist(product))}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
          />
        </Link>
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="rating">
          ⭐ {product.rating || 4.5}
        </div>

        <div className="product-bottom">
          <div>
            <span className="price">
              ${product.price}
            </span>

            {discount > 0 && (
              <span className="old-price">
                $
                {Math.round(
                  product.price /
                    (1 - discount / 100)
                )}
              </span>
            )}
          </div>

          <button
            className="add-button"
            onClick={() => dispatch(addToCart(product))}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}