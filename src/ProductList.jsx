import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (label, color) =>
  `https://placehold.co/300x300/${color}/ffffff?text=${encodeURIComponent(label)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('Snake Plant', '2e7d32'), description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: img('Spider Plant', '388e3c'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: img('Peace Lily', '43a047'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('Boston Fern', '1b5e20'), description: 'Adds humidity and removes toxins from indoor air.', cost: 20 },
      { name: 'Rubber Plant', image: img('Rubber Plant', '2e7d32'), description: 'Easy to grow and great at absorbing airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: img('Aloe Vera', '558b2f'), description: 'Purifies the air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('Lavender', '7e57c2'), description: 'Calming scent that promotes relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: img('Jasmine', '8e24aa'), description: 'Sweet floral fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: img('Rosemary', '689f38'), description: 'Fragrant herb that is also great for cooking.', cost: 15 },
      { name: 'Mint', image: img('Mint', '2e7d32'), description: 'Refreshing aroma, repels pests and flavors drinks.', cost: 12 },
      { name: 'Lemon Balm', image: img('Lemon Balm', '9e9d24'), description: 'Citrus scent that reduces stress and anxiety.', cost: 14 },
      { name: 'Hyacinth', image: img('Hyacinth', '5e35b1'), description: 'Strongly scented spring blooms in rich colors.', cost: 22 },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', image: img('ZZ Plant', '33691e'), description: 'Thrives in low light and needs very little water.', cost: 25 },
      { name: 'Cast Iron Plant', image: img('Cast Iron Plant', '1b5e20'), description: 'Nearly indestructible, tolerates deep shade.', cost: 16 },
      { name: 'Pothos', image: img('Pothos', '2e7d32'), description: 'Trailing vine that grows well in dim rooms.', cost: 10 },
      { name: 'Chinese Evergreen', image: img('Chinese Evergreen', '388e3c'), description: 'Patterned leaves that tolerate low light.', cost: 19 },
      { name: 'Parlor Palm', image: img('Parlor Palm', '43a047'), description: 'Compact palm that does well in shaded corners.', cost: 21 },
      { name: 'Dracaena', image: img('Dracaena', '558b2f'), description: 'Hardy, tall and happy with minimal light.', cost: 23 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleHome = (e) => {
    e.preventDefault();
    setShowCart(false);
    if (onHomeClick) onHomeClick();
  };

  const handlePlants = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCart = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={handleHome}>
          <span className="brand-name">Paradise Nursery</span>
          <span className="brand-tag">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={handleHome}>Home</a>
          <a href="#plants" onClick={handlePlants}>Plants</a>
          <a href="#cart" onClick={handleCart} className="cart-link" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="38" width="38">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-list">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <div className="product-card" key={plant.name}>
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <div className="product-price">${plant.cost}</div>
                      <button
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
