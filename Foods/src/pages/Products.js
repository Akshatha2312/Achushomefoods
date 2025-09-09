import React, { useState } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';

import beetrootChapati from '../assets/images/beetroot_chapati_mix.png';
import carrotChapati from '../assets/images/carrot_chapati_mix.png';
import fingerMilletChapati from '../assets/images/finger_millet_chapati_mix.png';
import multiGrainChapati from '../assets/images/multi_grain_chapati_mix.png';

import adaiMix from '../assets/images/adai_mix.png';
import fingerMilletDosa from '../assets/images/finger_millet_dosa_mix.png';
import kambuDosa from '../assets/images/kambu_dosa_mix.png';
import pearlMilletDosa from '../assets/images/pearl_millet_dosa.png';
import pesarattuMix from '../assets/images/pesarattu_mix.png';
import ragiDosa from '../assets/images/ragi_dosa_mix.png';
import wheatDosa from '../assets/images/wheat_dosa_mix.png';

import curryLeafRice from '../assets/images/curry_leaf_rice_powder.png';
import roastedSesameRice from '../assets/images/roasted_sesame_rice_powder.png';
import spicyLentilRice from '../assets/images/spicy_lentil_rice_powder.png';

const productsData = {
  'Chapati Mix': [
    { name: 'Beetroot Chapati Mix', image: beetrootChapati, price: 60, quantity: '500g', benefits: 'Beetroot is rich in iron and antioxidants.', steps: [] },
    { name: 'Carrot Chapati Mix', image: carrotChapati, price: 60, quantity: '500g', benefits: 'Carrot improves eye health and skin glow.', steps: [] },
    { name: 'Finger Millet Chapati Mix', image: fingerMilletChapati, price: 65, quantity: '500g', benefits: 'Rich in calcium and fiber.', steps: [] },
    { name: 'Multi Grain Chapati Mix', image: multiGrainChapati, price: 70, quantity: '500g', benefits: 'Protein, fiber, and energy.', steps: [] },
  ],
  'Dosa Mix': [
    { name: 'Adai Mix', image: adaiMix, price: 55, quantity: '500g', benefits: 'High protein and spicy.', steps: [] },
    { name: 'Finger Millet Dosa Mix', image: fingerMilletDosa, price: 60, quantity: '500g', benefits: 'Bone strength and diabetic-friendly.', steps: [] },
    { name: 'Kambu Dosa Mix', image: kambuDosa, price: 60, quantity: '500g', benefits: 'Digestion and weight loss.', steps: [] },
    { name: 'Pearl Millet Dosa Mix', image: pearlMilletDosa, price: 65, quantity: '500g', benefits: 'Heart health.', steps: [] },
    { name: 'Pesarattu Mix', image: pesarattuMix, price: 55, quantity: '500g', benefits: 'Green gram-based and nutritious.', steps: [] },
    { name: 'Ragi Dosa Mix', image: ragiDosa, price: 60, quantity: '500g', benefits: 'Calcium-rich and gluten-free.', steps: [] },
    { name: 'Wheat Dosa Mix', image: wheatDosa, price: 60, quantity: '500g', benefits: 'Easy to digest.', steps: [] },
  ],
  'Rice Powder': [
    { name: 'Curry Leaf Rice Powder', image: curryLeafRice, price: 70, quantity: '100g', benefits: 'Improves digestion and iron-rich.', steps: [] },
    { name: 'Roasted Sesame Rice Powder', image: roastedSesameRice, price: 75, quantity: '100g', benefits: 'Healthy fats and minerals.', steps: [] },
    { name: 'Spicy Lentil Rice Powder', image: spicyLentilRice, price: 75, quantity: '100g', benefits: 'High protein and spicy.', steps: [] },
  ],
};
function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Chapati Mix');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (productName) => {
    setMessage(`✅ ${productName} added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const allProducts = Object.values(productsData).flat();
      const matched = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matched.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };
// Show all products matching search term globally, or selected category if search is empty
const filteredProducts =
  searchTerm.length > 0
    ? Object.values(productsData)
        .flat() // all products from all categories
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : productsData[selectedCategory];

 

  return (
    <div className="products-container">
      <h2 className="products-heading">✨ Our Healthy ReadyMixes</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((item) => (
      <li
        key={item.name}
        onClick={() => {
          navigate(`/product/${encodeURIComponent(item.name)}`, {
            state: { product: item },
          });
          setSuggestions([]);
          setSearchTerm('');
        }}
        className="suggestion-item"
      >
        <img
          src={item.image}
          alt={item.name}
          className="suggestion-img"
        />
        <span>{item.name}</span>
      </li>
    ))}
  </ul>
)}

      </div>

      <div className="category-buttons">
        {Object.keys(productsData).map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              setSearchTerm('');
              setSuggestions([]);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {message && <div className="add-cart-message">{message}</div>}

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.name}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() =>
                  navigate(`/product/${encodeURIComponent(product.name)}`, {
                    state: { product },
                  })
                }
              />
              <h4>{product.name}</h4>
              <p className="price">₹{product.price} • {product.quantity}</p>
              <button className="add-cart-btn" onClick={() => handleAddToCart(product.name)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;




