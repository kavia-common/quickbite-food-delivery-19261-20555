import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * QuickBite Food Delivery - Ocean Professional welcome screen.
   * Defaults to the Ocean Professional vibe while still allowing light/dark toggle
   * to demonstrate that editing and theming work as intended.
   */
  const [theme, setTheme] = useState('light'); // default UI mode
  const oceanAccent = { primary: '#2563EB', secondary: '#F59E0B' }; // Ocean Professional accents

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header" style={{ border: `2px solid ${oceanAccent.primary}`, borderRadius: 12, padding: 24 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div
            aria-hidden="true"
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `radial-gradient(circle at 30% 30%, ${oceanAccent.primary}, rgba(37,99,235,0.6))`,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,.5), 0 6px 14px rgba(37,99,235,.25)',
            }}
          />
          <h1 style={{ margin: 0, fontSize: 28 }}>QuickBite Food Delivery</h1>
        </div>

        <p style={{ marginTop: 0, maxWidth: 680, lineHeight: 1.5 }}>
          Welcome! This frontend uses the Ocean Professional theme (blue and amber accents, modern style).
          You can browse restaurants, add items to your cart, checkout, and track orders.
        </p>

        <div style={{ display: 'inline-flex', gap: 8, marginTop: 8 }}>
          <span
            className="App-link"
            style={{
              color: oceanAccent.primary,
              fontWeight: 600,
              background: 'rgba(37,99,235,0.08)',
              padding: '6px 10px',
              borderRadius: 999,
            }}
          >
            Theme: Ocean Professional
          </span>
          <span
            className="App-link"
            style={{
              color: oceanAccent.secondary,
              fontWeight: 600,
              background: 'rgba(245,158,11,0.12)',
              padding: '6px 10px',
              borderRadius: 999,
            }}
          >
            UI mode: {theme}
          </span>
        </div>

        <div style={{ marginTop: 16, fontSize: 14, opacity: 0.9 }}>
          Edit src/App.js and save to reload. This message confirms that editing works.
        </div>
      </header>
    </div>
  );
}

export default App;
