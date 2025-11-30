const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
router.post("/place", async (req, res) => {
  const { userEmail } = req.body;

  const cartItems = await Cart.find({ userEmail });

  if (cartItems.length === 0) {
    return res.json({ success: false, message: "Cart is empty" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const newOrder = new Order({
    userEmail,
    items: cartItems,
    totalPrice: total,
  });

  await newOrder.save();

  // Clear cart after order
  await Cart.deleteMany({ userEmail });

  res.json({ success: true, message: "Order placed successfully" });
});

// Get all orders for user
router.post("/list", async (req, res) => {
  const { userEmail } = req.body;
  const orders = await Order.find({ userEmail });

  res.json(orders);
});

module.exports = router;

