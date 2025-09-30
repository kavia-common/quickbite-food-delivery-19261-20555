import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';

/**
 * PUBLIC_INTERFACE
 * Main application entry: assembles the Ocean Professional layout (Header, content area with sidebar + cart in pages, Footer)
 * and defines routing. Uses mock data by default; can integrate with API when REACT_APP_API_BASE is set.
 */
export default function App() {
  const [search, setSearch] = React.useState('');

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-shell">
          <Header onSearch={setSearch} />
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<Orders />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
