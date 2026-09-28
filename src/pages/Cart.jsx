import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="page">
        <div className="page-header">
          <span className="eyebrow">YOUR BAG</span>
          <h1>Shopping Cart</h1>
        </div>

        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Discover something you love and add it to your cart."
        />

        <div className="center-button">
          <Link to="/products" className="primary-button">
            Explore Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">YOUR BAG</span>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div className="cart-info">
                <span>{item.category}</span>
                <h3>{item.title}</h3>

                <strong>${item.price}</strong>
              </div>

              <div className="quantity-control">
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                >
                  +
                </button>
              </div>

              <strong className="cart-total">
                ${(item.price * item.quantity).toFixed(2)}
              </strong>

              <button
                className="remove-button"
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                ×
              </button>
            </div>
          ))}

          <button
            className="clear-cart"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </div>

        <aside className="summary-card">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div>
            <span>Shipping</span>
            <strong>
              {shipping === 0
                ? "FREE"
                : `$${shipping.toFixed(2)}`}
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            className="primary-button full-button"
            onClick={() =>
              alert("Demo checkout completed successfully!")
            }
          >
            Proceed to Checkout →
          </button>

          <p className="secure-text">
            🔒 Secure checkout · Easy returns
          </p>
        </aside>
      </div>
    </main>
  );
}