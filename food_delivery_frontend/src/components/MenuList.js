import React from 'react';
import { useCart } from '../context/CartContext';

export default function MenuList({ restaurant, items }) {
  const { addItem, setRestaurant } = useCart();

  React.useEffect(() => {
    setRestaurant(restaurant);
  }, [restaurant, setRestaurant]);

  return (
    <div className="vstack">
      {items.map(m => (
        <div key={m.id} className="menu-item">
          <div className="menu-thumb" />
          <div className="menu-info">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{m.name}</strong>
              <span className="price">${m.price.toFixed(2)}</span>
            </div>
            <div className="text-muted">{m.desc}</div>
          </div>
          <div className="hstack" style={{ alignItems: 'center' }}>
            <button
              className="btn"
              onClick={() => addItem({ id: m.id, name: m.name, price: m.price })}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
