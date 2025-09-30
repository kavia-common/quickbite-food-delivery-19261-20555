import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../services/api';
import { mockRestaurants } from '../mockData';
import MenuList from '../components/MenuList';

export default function RestaurantPage() {
  const { id } = useParams();
  const restaurant = mockRestaurants.find(r => r.id === id) || mockRestaurants[0];
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchMenu(id).then((data) => {
      if (alive) setItems(data);
    }).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  return (
    <div className="main-area">
      <div className="surface sidebar" />
      <main className="content">
        <div className="surface" style={{ padding: 12 }}>
          <div className="hstack" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="badge" style={{ marginBottom: 8 }}>{restaurant.cuisine.join(' • ')}</div>
              <h2 style={{ margin: '0 0 4px 0' }}>{restaurant.name}</h2>
              <div className="restaurant-meta">
                <span>⭐ {restaurant.rating}</span>
                <span>•</span>
                <span>{restaurant.etaMin}-{restaurant.etaMax} min</span>
                <span>•</span>
                <span>Delivery ${restaurant.fee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            {loading ? <div className="status info">Loading menu...</div> :
              <MenuList restaurant={restaurant} items={items} />}
          </div>
        </div>
      </main>
      <div className="surface cart" />
    </div>
  );
}
