import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createCart, updateCart } from '../services/api';

const CartCtx = createContext(null);

// PUBLIC_INTERFACE
export function useCart() {
  /** React hook to access cart state and operations. */
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provider wrapping the app to offer cart state and operations. */
  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    (async () => {
      const c = await createCart();
      setCartId(c.cartId);
    })();
  }, []);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = restaurant?.fee ?? 1.99;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + deliveryFee + tax).toFixed(2);

  function upsertItem(newItem) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === newItem.id);
      const next = [...prev];
      if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
      else next.push({ ...newItem, qty: 1 });
      return next;
    });
  }

  function updateQty(id, qty) {
    setItems(prev => {
      const next = prev.map(it => it.id === id ? { ...it, qty: Math.max(0, qty) } : it)
        .filter(it => it.qty > 0);
      return next;
    });
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  useEffect(() => {
    // Push updates to server if available
    if (!cartId) return;
    updateCart(cartId, { items, restaurantId: restaurant?.id })
      .catch(() => void 0);
  }, [items, restaurant, cartId]);

  const value = useMemo(() => ({
    cartId, items, restaurant, setRestaurant,
    totals: { subtotal, deliveryFee, tax, total },
    addItem: upsertItem,
    updateQty,
    removeItem,
    clearCart,
  }), [cartId, items, restaurant, subtotal, deliveryFee, tax, total]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
