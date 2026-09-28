import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const wishlistCount = useSelector(
    (state) => state.wishlist.items.length
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">✦</span>
          <span>
            Speedgo
            <small>SMART COMMERCE</small>
          </span>
        </NavLink>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Products
          </NavLink>

          <NavLink to="/wishlist" onClick={closeMenu}>
            Wishlist
            {wishlistCount > 0 && (
              <span className="nav-badge">{wishlistCount}</span>
            )}
          </NavLink>

          <NavLink to="/cart" onClick={closeMenu}>
            Cart
            {cartCount > 0 && (
              <span className="nav-badge">{cartCount}</span>
            )}
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          <NavLink to="/admin" onClick={closeMenu}>
            Admin
          </NavLink>

          <button
            className="theme-button"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}