import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductDetail.css';

function ProductDetail() {
  const { state } = useLocation();
  const { addToCart } = useContext(CartContext);
  const product = state?.product;

  if (!product) return <div className="product-detail-container">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart successfully! 🎉`, {
      position: "top-right",       // stays at top-right
      className: "custom-toast",   // 👈 apply CSS offset
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="detail-img" />
        <div className="detail-content">
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>How to Make:</strong> {product.howToMake}</p>
          <p><strong>Benefits:</strong> {product.benefits}</p>
          <h4>Preparation Steps:</h4>
          <ol>
            {product.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
