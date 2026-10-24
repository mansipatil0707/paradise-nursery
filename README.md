# Paradise Nursery

Paradise Nursery is an online houseplant shop built with React and Redux Toolkit.

## Features
- Landing page with company name, about us section and a "Get Started" button
- Product listing with 18 houseplants in 3 categories (Air Purifying, Aromatic, Low Light)
- "Add to Cart" buttons that disable after adding, with a live cart count in the navbar
- Shopping cart page with per-item subtotal, overall total, quantity +/- buttons and delete
- "Checkout" button (shows "Coming Soon") and "Continue Shopping" button

## Tech stack
React 18, Redux Toolkit, react-redux, Vite

## Run locally
```
npm install
npm run dev
```

## Project structure
```
src/
  App.jsx, App.css, AboutUs.jsx
  ProductList.jsx, ProductList.css
  CartItem.jsx, CartItem.css
  CartSlice.jsx, store.js, main.jsx
```
