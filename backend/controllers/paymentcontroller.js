const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Verify Razorpay Payment
const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Use key_secret from the razorpay instance
    const hmac = crypto.createHmac("sha256", razorpay.key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
