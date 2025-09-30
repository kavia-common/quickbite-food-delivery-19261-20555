import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder, processPayment } from '../services/api';

export default function Checkout() {
  const nav = useNavigate();
  const { cartId, items, totals, restaurant, clearCart } = useCart();
  const [customer, setCustomer] = React.useState({ name: '', address: '', phone: '' });
  const [payment, setPayment] = React.useState({ cardNumber: '', expiry: '', cvc: '' });
  const [status, setStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const disabled = items.length === 0 || !customer.name || !customer.address || !payment.cardNumber;

  async function handlePay() {
    setLoading(true);
    setStatus({ type: 'info', text: 'Placing order...' });
    try {
      const order = await placeOrder(cartId, { items, totals, restaurantId: restaurant?.id, customer });
      setStatus({ type: 'info', text: 'Processing payment...' });
      const pay = await processPayment(order.orderId, payment);
      if (pay.error) {
        setStatus({ type: 'error', text: pay.error });
      } else {
        setStatus({ type: 'success', text: 'Payment successful!' });
        clearCart();
        setTimeout(() => nav(`/orders/${order.orderId}`), 800);
      }
    } catch (e) {
      setStatus({ type: 'error', text: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-area">
      <div className="surface sidebar" />
      <main className="content">
        <div className="surface" style={{ padding: 12 }}>
          <h2>Checkout</h2>

          <div className="grid" style={{ marginTop: 8 }}>
            <div className="col-4">
              <div className="card" style={{ padding: 12 }}>
                <h3 style={{ marginTop: 0 }}>Delivery details</h3>
                <div className="vstack">
                  <input className="input" placeholder="Full name" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
                  <input className="input" placeholder="Address" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
                  <input className="input" placeholder="Phone" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" style={{ padding: 12 }}>
                <h3 style={{ marginTop: 0 }}>Payment</h3>
                <div className="vstack">
                  <input className="input" placeholder="Card number" value={payment.cardNumber} onChange={e => setPayment({ ...payment, cardNumber: e.target.value })} />
                  <div className="hstack">
                    <input className="input" placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment({ ...payment, expiry: e.target.value })} />
                    <input className="input" placeholder="CVC" value={payment.cvc} onChange={e => setPayment({ ...payment, cvc: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" style={{ padding: 12 }}>
                <h3 style={{ marginTop: 0 }}>Order summary</h3>
                <div className="vstack">
                  {items.map(it => (
                    <div key={it.id} className="hstack" style={{ justifyContent: 'space-between' }}>
                      <span>{it.qty} × {it.name}</span>
                      <strong>${(it.price * it.qty).toFixed(2)}</strong>
                    </div>
                  ))}
                  <div className="divider" />
                  <div className="hstack" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="hstack" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">Delivery</span>
                    <span>${totals.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="hstack" style={{ justifyContent: 'space-between' }}>
                    <span className="text-muted">Tax</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="hstack" style={{ justifyContent: 'space-between', marginTop: 6 }}>
                    <strong>Total</strong>
                    <strong>${totals.total.toFixed(2)}</strong>
                  </div>
                  {status && <div className={`status ${status.type}`} style={{ marginTop: 6 }}>{status.text}</div>}
                  <button className="btn" disabled={disabled || loading} onClick={handlePay}>
                    {loading ? 'Processing...' : 'Pay & Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <div className="surface cart" />
    </div>
  );
}
