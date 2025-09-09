import React, { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2>🛍️ Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-section">
          <p>Your cart is currently empty. Start shopping now!</p>
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => {
              const id = item.id ?? item.name;
              return (
                <li key={id + index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} x {item.quantity || 1}</p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label={`decrease ${item.name}`}
                        onClick={() => decreaseQuantity(id)}
                      >
                        -
                      </button>

                      <span>{item.quantity || 1}</span>

                      <button
                        type="button"
                        aria-label={`increase ${item.name}`}
                        onClick={() => increaseQuantity(id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cart-actions">
            <button type="button" className="clear-btn" onClick={clearCart}>
              🗑️ Clear Cart
            </button>
          </div>

          <div className="cart-total">
            <h3>Total: ₹{totalAmount}</h3>
            <button
              type="button"
              className="checkout-btn"
              onClick={() => navigate('/billing')}
            >
              ✅ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
