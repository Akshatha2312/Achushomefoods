// src/pages/Billing.js
import React, { useState } from 'react';
import './Billing.css';

function Billing() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'UPI',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="billing-container">
      <h2 className="billing-title">🧾 Billing & Checkout</h2>

      {!submitted ? (
        <form className="billing-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Shipping Address
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Your full delivery address"
            ></textarea>
          </label>

          <label>
            Payment Method
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="payment-select"
            >
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Card">Credit/Debit Card</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">Confirm & Pay</button>
        </form>
      ) : (
        <div className="success-message">
          <h3>✅ Order Confirmed!</h3>
          <p>Thank you, <strong>{formData.name}</strong>! Your delicious mixes will reach you soon. 🎉</p>
        </div>
      )}
    </div>
  );
}

export default Billing;
