import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderStatus } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Orders page: accepts optional :orderId to poll and display status, or lets user input an ID.
 */
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

const Orders = function Orders() {
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
    return () => { alive = false; if (timer) clearInterval(timer); };
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
                <input
                  className="input"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g., loc_1712345678"
                />
                <button className="btn" onClick={() => id && nav(`/orders/${id}`)}>
                  Track
                </button>
              </div>
              <div className="text-muted">
                Or see a sample: <Link to="/orders/loc_demo">loc_demo</Link>
              </div>
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
            {status ? (
              <StatusTag status={status.status} />
            ) : (
              <span className="status info">Loading...</span>
            )}
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
};
export default Orders;
