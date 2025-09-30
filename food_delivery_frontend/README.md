# QuickBite Food Delivery Frontend (Ocean Professional)

Modern React UI for browsing restaurants, placing orders, paying online, and tracking deliveries.

## Features
- Ocean-themed design (primary #2563EB, secondary #F59E0B, error #EF4444)
- Layout: Header, Categories sidebar, Content area, Cart sidebar, Footer
- Restaurants list, menu view, cart management
- Checkout with payment mock and order placement
- Order tracking with polling and status badges
- REST API integration with graceful mock fallbacks

## Getting Started
- Install: `npm install`
- Run: `npm start`
- Test: `npm test`
- Build: `npm run build`

## Environment
Copy `.env.example` to `.env` and set:
- `REACT_APP_API_BASE` (optional). If not set, the UI will use mock data.

## Structure
- `src/services/api.js` REST API layer with fallbacks
- `src/context/CartContext.js` global cart state
- `src/pages/*` Home, Restaurant, Checkout, Orders
- `src/components/*` Header, Sidebar, CartSidebar, etc.
- `src/styles.css` Ocean Professional design system

## Routing
- `/` Home (restaurants)
- `/restaurant/:id` Menu for a restaurant
- `/checkout` Payment and order placement
- `/orders` Input an order ID to track
- `/orders/:orderId` Tracking view
