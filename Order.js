const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
    }
  ],
  totalPrice: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
