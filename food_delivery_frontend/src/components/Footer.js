import React from 'react';

/**
 * Footer with contact info following Ocean Professional theme.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} QuickBite</div>
        <div className="hstack">
          <span>Contact</span>
          <a className="link" href="mailto:support@quickbite.app">
            support@quickbite.app
          </a>
        </div>
      </div>
    </footer>
  );
}
