/**
 * API service layer for the Food Delivery frontend.
 * Uses REACT_APP_API_BASE for base URL; falls back to mock data if endpoints fail.
 */
import { mockRestaurants, mockMenus } from '../mockData';

const BASE = process.env.REACT_APP_API_BASE || '';

async function http(path, options = {}) {
  const url = BASE ? `${BASE}${path}` : path;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.status === 204) return null;
    return await res.json();
  } catch (err) {
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function fetchRestaurants(params = {}) {
  /** Fetch list of restaurants.
   * Returns: [{ id, name, rating, etaMin, etaMax, cuisine[], fee }]
   */
  try {
    const query = new URLSearchParams(params).toString();
    const p = query ? `/restaurants?${query}` : '/restaurants';
    if (!BASE) throw new Error('no-base'); // force mock when base not set
    return await http(p);
  } catch {
    // Mock fallback with basic filtering by category/query
    const { category, q } = params;
    let data = mockRestaurants;
    if (category && category !== 'All') {
      data = data.filter(r => r.cuisine.includes(category));
    }
    if (q) {
      const t = q.toLowerCase();
      data = data.filter(r => r.name.toLowerCase().includes(t));
    }
    return data;
  }
}

// PUBLIC_INTERFACE
export async function fetchMenu(restaurantId) {
  /** Fetch menu items for a restaurant.
   * Returns: [{ id, name, desc, price }]
   */
  try {
    if (!BASE) throw new Error('no-base');
    return await http(`/restaurants/${restaurantId}/menu`);
  } catch {
    return mockMenus[restaurantId] || [];
  }
}

// PUBLIC_INTERFACE
export async function createCart() {
  /** Create or fetch a cart session. Returns: { cartId } */
  try {
    if (!BASE) throw new Error('no-base');
    return await http('/cart', { method: 'POST' });
  } catch {
    return { cartId: 'local-cart' };
  }
}

// PUBLIC_INTERFACE
export async function updateCart(cartId, payload) {
  /** Update cart items or metadata. Returns: { items, totals } */
  try {
    if (!BASE) throw new Error('no-base');
    return await http(`/cart/${cartId}`, { method: 'PUT', body: JSON.stringify(payload) });
  } catch {
    return payload; // local updates handled in state
  }
}

// PUBLIC_INTERFACE
export async function placeOrder(cartId, details) {
  /** Place an order. Returns: { orderId, status } */
  try {
    if (!BASE) throw new Error('no-base');
    return await http(`/orders`, { method: 'POST', body: JSON.stringify({ cartId, ...details }) });
  } catch {
    return { orderId: `loc_${Date.now()}`, status: 'processing' };
  }
}

// PUBLIC_INTERFACE
export async function getOrderStatus(orderId) {
  /** Fetch order status. Returns: { orderId, status, eta } */
  try {
    if (!BASE) throw new Error('no-base');
    return await http(`/orders/${orderId}/status`);
  } catch {
    const phases = ['processing', 'preparing', 'out_for_delivery', 'delivered'];
    const idx = Math.min(3, Math.floor(((Date.now() / 10000) % phases.length)));
    return { orderId, status: phases[idx], eta: 12 + (3 - idx) * 5 };
  }
}

// PUBLIC_INTERFACE
export async function processPayment(orderId, payment) {
  /** Process payment. Returns: { paid: true, txId } or { error } */
  try {
    if (!BASE) throw new Error('no-base');
    return await http(`/payments`, { method: 'POST', body: JSON.stringify({ orderId, ...payment }) });
  } catch {
    if (!payment || !payment.cardNumber) {
      return { error: 'Invalid payment details' };
    }
    return { paid: true, txId: `tx_${Math.random().toString(36).slice(2)}` };
  }
}
