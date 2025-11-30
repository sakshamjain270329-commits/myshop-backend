const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  userEmail: { type: String, required: true } // to identify which user added
});

module.exports = mongoose.model("Cart", CartSchema);
