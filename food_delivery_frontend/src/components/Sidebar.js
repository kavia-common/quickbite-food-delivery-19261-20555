import React from 'react';

/**
 * Sidebar categories navigation.
 * Displays a vertical list of categories with active state.
 */
export default function Sidebar({ categories, active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="section-title">Categories</div>
      <div className="vstack">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category ${active === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
          >
            <span>{cat}</span>
            {active === cat ? (
              <span className="badge">Selected</span>
            ) : (
              <span className="text-muted">View</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
