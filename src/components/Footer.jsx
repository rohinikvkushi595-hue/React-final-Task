import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">✦ NEXORA</div>
          <p>
            A modern shopping experience designed for
            smarter, simpler and faster commerce.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">Admin</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p>hello@nexora.com</p>
          <p>+91 98765 43210</p>
          <p>Bengaluru, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NEXORA. All rights reserved.</span>
        <span>Built with React + Redux Toolkit</span>
      </div>
    </footer>
  );
}