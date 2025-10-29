const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" } // Pending, Shipped, Delivered, Cancelled
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
