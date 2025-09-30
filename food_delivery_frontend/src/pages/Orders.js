import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderStatus } from '../services/api';

const StatusTag = ({ status }) => {
  const map = {
    processing: { label: 'Processing', cls: 'info' },
    preparing: { label: 'Preparing', cls: 'info' },
    out_for_delivery: { label: 'On the way', cls: 'success' },
    delivered: { label: 'Delivered', cls: 'success' },
    failed: { label: 'Failed', cls: 'error' },
  };
  const { label, cls } = map[status] || { label: status, cls: 'info' };
  return <span className={`status ${cls}`}>{label}</span>;
};

export default function Orders() {
  const { orderId } = useParams();
  const nav = useNavigate();
  const [id, setId] = React.useState(orderId || '');
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    let timer;
    let alive = true;
    if (orderId) {
      const fn = async () => {
        const s = await getOrderStatus(orderId);
        if (alive) setStatus(s);
      };
      fn();
      timer = setInterval(fn, 5000);
    }
    return () => { alive = false; timer && clearInterval(timer); };
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="main-area">
        <div className="surface sidebar" />
        <main className="content">
          <div className="surface" style={{ padding: 12 }}>
            <h2>Track your order</h2>
            <div className="vstack">
              <div className="text-muted">Enter your order ID</div>
              <div className="hstack">
                <input className="input" value={id} onChange={e => setId(e.target.value)} placeholder="e.g., loc_1712345678" />
                <button className="btn" onClick={() => id && nav(`/orders/${id}`)}>Track</button>
              </div>
              <div className="text-muted">Or see a sample: <Link to="/orders/loc_demo">loc_demo</Link></div>
            </div>
          </div>
        </main>
        <div className="surface cart" />
      </div>
    );
  }

  return (
    <div className="main-area">
      <div className="surface sidebar" />
      <main className="content">
        <div className="surface" style={{ padding: 12 }}>
          <div className="section-header">
            <h2 style={{ margin: 0 }}>Order #{orderId}</h2>
            {status ? <StatusTag status={status.status} /> : <span className="status info">Loading...</span>}
          </div>
          {status && (
            <div className="vstack" style={{ marginTop: 8 }}>
              <div className="hstack">
                <div className="badge">ETA: {status.eta} min</div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <strong>Order updates</strong>
                <ul>
                  <li>We received your order</li>
                  <li>Restaurant is preparing your food</li>
                  <li>Courier will pick it up shortly</li>
                  <li>Delivery on the way</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="surface cart" />
    </div>
  );
}
```

Explanation: Footer with contact info.
````write file="quickbite-food-delivery-19261-20555/food_delivery_frontend/src/components/Footer.js"
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} QuickBite</div>
        <div className="hstack">
          <span>Contact</span>
          <a className="link" href="mailto:support@quickbite.app">support@quickbite.app</a>
        </div>
      </div>
    </footer>
  );
}
```

Explanation: New App with routing, layout integration (Header, Sidebar, Content, CartSidebar, Footer). Replaces old template App to satisfy app entry points and UI flow.
````write file="quickbite-food-delivery-19261-20555/food_delivery_frontend/src/App.js"
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';

// PUBLIC_INTERFACE
export default function App() {
  /** Main application entry: defines routing, layout, and theming wrapper. */
  const [search, setSearch] = React.useState('');

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-shell">
          <Header onSearch={setSearch} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
            <div>
              <Routes>
                <Route path="/" element={<Home search={search} />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<Orders />} />
              </Routes>
            </div>
            <div className="surface" style={{ display: 'none' }} />
          </div>
          <Footer />
        </div>

        {/* Sticky cart sidebar on wide screens */}
        <div className="surface"
             style={{ position: 'fixed', right: 16, top: 84, width: 360, display: 'none' }}
             aria-hidden="true" />
      </CartProvider>
    </BrowserRouter>
  );
}
