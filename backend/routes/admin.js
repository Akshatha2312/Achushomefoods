const express = require("express");
const { isAdmin } = require("../middleware/auth");
const {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getAllPayments
} = require("../controllers/adminController");

const router = express.Router();

// 🔹 Predefined admin credentials
const ADMIN_EMAIL = "admin@ecom.com";
const ADMIN_PASSWORD = "admin123";

// 🔹 Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // ✅ later replace dummy token with JWT
    return res.json({
      success: true,
      role: "admin",
      token: "dummy-jwt-token"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

// 🔹 Users
router.get("/users", isAdmin, getAllUsers);

// 🔹 Orders
router.get("/orders", isAdmin, getAllOrders);
router.put("/orders/:id", isAdmin, updateOrderStatus);

// 🔹 Payments
router.get("/payments", isAdmin, getAllPayments);

module.exports = router;
