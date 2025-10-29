const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
