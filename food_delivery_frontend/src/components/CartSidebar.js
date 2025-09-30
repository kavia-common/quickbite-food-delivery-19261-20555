import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * Cart sidebar displaying items, quantity controls, and order totals.
 * Provides a link to proceed to checkout.
 */
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
          {items.length === 0 && (
            <div className="text-muted">Your cart is empty</div>
          )}
          {items.map((it) => (
            <div key={it.id} className="cart-item">
              <div>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div className="text-muted">${it.price.toFixed(2)}</div>
              </div>
              <div className="hstack">
                <div className="qty">
                  <button
                    aria-label="decrease"
                    onClick={() => updateQty(it.id, it.qty - 1)}
                  >
                    -
                  </button>
                  <span>{it.qty}</span>
                  <button
                    aria-label="increase"
                    onClick={() => updateQty(it.id, it.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="btn ghost" onClick={() => removeItem(it.id)}>
                  Remove
                </button>
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
          <div
            className="hstack"
            style={{ justifyContent: 'space-between', marginTop: 6 }}
          >
            <span>Total</span>
            <strong>${totals.total.toFixed(2)}</strong>
          </div>
        </div>

        <div style={{ marginTop: 12 }} className="hstack">
          <Link
            to="/checkout"
            className="btn"
            style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </aside>
  );
}
