const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t send password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Fetch all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
};

// Fetch all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", "name email");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

module.exports = {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getAllPayments
};
