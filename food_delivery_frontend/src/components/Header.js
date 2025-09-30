import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/orders">Track Order</Link>
          <Link className="link" to="/checkout">
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
```

Explanation: Sidebar categories list with active selection.
````write file="quickbite-food-delivery-19261-20555/food_delivery_frontend/src/components/Sidebar.js"
import React from 'react';

export default function Sidebar({ categories, active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="section-title">Categories</div>
      <div className="vstack">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category ${active === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            <span>{cat}</span>
            {active === cat ? <span className="badge">Selected</span> : <span className="text-muted">View</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
```

Explanation: Cart sidebar with item list and checkout navigation.
````write file="quickbite-food-delivery-19261-20555/food_delivery_frontend/src/components/CartSidebar.js"
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, totals, updateQty, removeItem } = useCart();
  return (
    <aside className="cart">
      <div className="surface" style={{ padding: 12 }}>
        <div className="section-header">
          <h3 className="title">Your Cart</h3>
          <span className="text-muted">{items.length} items</span>
        </div>
        <div className="vstack">
          {items.length === 0 && <div className="text-muted">Your cart is empty</div>}
          {items.map(it => (
            <div key={it.id} className="cart-item">
              <div>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div className="text-muted">${it.price.toFixed(2)}</div>
              </div>
              <div className="hstack">
                <div className="qty">
                  <button aria-label="decrease" onClick={() => updateQty(it.id, it.qty - 1)}>-</button>
                  <span>{it.qty}</span>
                  <button aria-label="increase" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                </div>
                <button className="btn ghost" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div className="vstack">
          <div className="hstack" style={{ justifyContent: 'space-between' }}>
            <span className="text-muted">Subtotal</span>
            <strong>${totals.subtotal.toFixed(2)}</strong>
          </div>
          <div className="hstack" style={{ justifyContent: 'space-between' }}>
            <span className="text-muted">Delivery</span>
            <strong>${totals.deliveryFee.toFixed(2)}</strong>
          </div>
          <div className="hstack" style={{ justifyContent: 'space-between' }}>
            <span className="text-muted">Tax</span>
            <strong>${totals.tax.toFixed(2)}</strong>
          </div>
          <div className="hstack" style={{ justifyContent: 'space-between', marginTop: 6 }}>
            <span>Total</span>
            <strong>${totals.total.toFixed(2)}</strong>
          </div>
        </div>

        <div style={{ marginTop: 12 }} className="hstack">
          <Link to="/checkout" className="btn" style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </aside>
  );
}
```

Explanation: Restaurant list and menu components for browsing and adding items to cart.
````write file="quickbite-food-delivery-19261-20555/food_delivery_frontend/src/components/RestaurantList.js"
import React from 'react';

export default function RestaurantList({ restaurants, onOpen }) {
  return (
    <div className="grid">
      {restaurants.map(r => (
        <div key={r.id} className="col-4">
          <div className="card restaurant-card" onClick={() => onOpen(r)} role="button" style={{ cursor: 'pointer' }}>
            <div className="banner" style={{ background: `linear-gradient(120deg, rgba(37,99,235,.2), ${r.bannerColor || '#E6F0FF'})` }} />
            <div className="content">
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <h3 style={{ margin: '6px 0' }}>{r.name}</h3>
                <span className="badge">
                  <span role="img" aria-label="star">⭐</span> {r.rating}
                </span>
              </div>
              <div className="restaurant-meta">
                <span>{r.cuisine.join(', ')}</span>
                <span>•</span>
                <span>{r.etaMin}-{r.etaMax} min</span>
              </div>
              <div className="hstack" style={{ marginTop: 8, justifyContent: 'space-between' }}>
                <span className="text-muted">Delivery ${r.fee.toFixed(2)}</span>
                <button className="btn ghost">View Menu</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
