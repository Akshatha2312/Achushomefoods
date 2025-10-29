const Razorpay = require("razorpay");

// Razorpay instance with your test keys
const razorpay = new Razorpay({
  key_id: "rzp_test_RJ67F09oS4xNuf",
  key_secret: "CPIKhtO5SiQsK4R3k8jUhpIz"
});

module.exports = razorpay;
