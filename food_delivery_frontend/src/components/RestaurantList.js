import React from 'react';

/**
 * Grid of restaurant cards with basic info and CTA.
 */
export default function RestaurantList({ restaurants, onOpen }) {
  return (
    <div className="grid">
      {restaurants.map((r) => (
        <div key={r.id} className="col-4">
          <div
            className="card restaurant-card"
            onClick={() => onOpen(r)}
            role="button"
            style={{ cursor: 'pointer' }}
          >
            <div
              className="banner"
              style={{
                background: `linear-gradient(120deg, rgba(37,99,235,.2), ${
                  r.bannerColor || '#E6F0FF'
                })`,
              }}
            />
            <div className="content">
              <div className="hstack" style={{ justifyContent: 'space-between' }}>
                <h3 style={{ margin: '6px 0' }}>{r.name}</h3>
                <span className="badge">
                  <span role="img" aria-label="star">
                    ⭐
                  </span>{' '}
                  {r.rating}
                </span>
              </div>
              <div className="restaurant-meta">
                <span>{r.cuisine.join(', ')}</span>
                <span>•</span>
                <span>
                  {r.etaMin}-{r.etaMax} min
                </span>
              </div>
              <div
                className="hstack"
                style={{ marginTop: 8, justifyContent: 'space-between' }}
              >
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
