import React from 'react';
import CartSidebar from './components/CartSidebar';

export default function LayoutWithCart({ children }) {
  const [isWide, setIsWide] = React.useState(window.innerWidth >= 992);
  React.useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 992);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isWide ? '1fr 360px' : '1fr', gap: 16 }}>
      <div>{children}</div>
      {isWide && <div className="surface"><CartSidebar /></div>}
    </div>
  );
}
