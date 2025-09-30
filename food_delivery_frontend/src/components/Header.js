import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * PUBLIC_INTERFACE
 * Header with brand, search bar, and navigation links.
 * Shows cart item count and forwards search input up via onSearch prop.
 */
export default function Header({ onSearch }) {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-logo" />
          QuickBite
        </div>

        <div className="hstack" style={{ flex: 1, maxWidth: 560 }}>
          <input
            className="input"
            placeholder="Search restaurants or dishes..."
            aria-label="Search restaurants or dishes"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/orders">Track Order</Link>
          <Link className="link" to="/checkout" aria-label="Cart">
            Cart
            <span className="badge" style={{ marginLeft: 8 }}>
              {count}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
