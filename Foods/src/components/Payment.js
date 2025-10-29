import React from "react";

function Payment() {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const res = await fetch("http://localhost:6050/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }) // Amount in INR (₹500)
      });

      const order = await res.json();

      // 2️⃣ Razorpay checkout options
      const options = {
        key: "rzp_test_RJ67F09oS4xNuf", // Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "My E-Commerce Store",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          // 3️⃣ Verify payment
          const verifyRes = await fetch("http://localhost:6050/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          });
          const data = await verifyRes.json();
          alert(data.message);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: { color: "#3399cc" }
      };

      // 4️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Pay ₹500</h2>
      <button
        onClick={handlePayment}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
