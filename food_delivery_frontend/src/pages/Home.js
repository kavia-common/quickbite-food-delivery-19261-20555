import React from 'react';
import Sidebar from '../components/Sidebar';
import RestaurantList from '../components/RestaurantList';
import { categories as allCategories, mockRestaurants } from '../mockData';
import { fetchRestaurants } from '../services/api';

export default function Home({ search }) {
  const [category, setCategory] = React.useState('All');
  const [restaurants, setRestaurants] = React.useState(mockRestaurants);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchRestaurants({ category, q: search })
      .then((data) => { if (alive) setRestaurants(data); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [category, search]);

  const navigateToMenu = (r) => {
    window.history.pushState({}, '', `/restaurant/${r.id}`);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <div className="main-area">
      <div className="surface sidebar">
        <Sidebar categories={allCategories} active={category} onSelect={setCategory} />
      </div>

      <main className="content">
        <div className="surface" style={{ padding: 12 }}>
          <div className="section-header">
            <h2 style={{ margin: 0 }}>Restaurants</h2>
            {loading ? <span className="status info">Loading...</span> :
              <span className="text-muted">{restaurants.length} results</span>}
          </div>
          <RestaurantList restaurants={restaurants} onOpen={navigateToMenu} />
        </div>
      </main>

      <div className="surface cart">
        {/* CartSidebar is mounted in layout to keep it sticky; show placeholder when small screens */}
        <div className="text-muted">Cart is available on the right or via Checkout.</div>
      </div>
    </div>
  );
}
