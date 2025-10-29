import React, { useState } from "react";
import "./Billing.css";

function Billing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "UPI",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (amount) => {
    try {
      const res = await fetch("http://localhost:6050/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_RJ67F09oS4xNuf",
        amount: order.amount,
        currency: order.currency,
        name: "Achu's Home Foods",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch("http://localhost:6050/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name: formData.name,
              email: formData.email
            }),
          });
          const data = await verifyRes.json();
          alert(data.message);
          if (data.success) setSubmitted(true);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
        method: { upi: true, card: false, netbanking: false, wallet: false },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === "UPI") {
      handlePayment(500); // Replace with actual cart total
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="billing-page">
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
                placeholder="Enter your full name"
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

            <button type="submit" className="submit-btn">
              Confirm & Pay
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h3>✅ Order Confirmed!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>! Your delicious mixes will reach you soon. 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
