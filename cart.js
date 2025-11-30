const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add item to cart
router.post("/add", async (req, res) => {
  const { productId, name, price, image, userEmail } = req.body;

  try {
    const item = new Cart({ productId, name, price, image, userEmail });
    await item.save();

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    res.json({ success: false, message: "Error adding to cart" });
  }
});

// Get cart items
router.post("/list", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const items = await Cart.find({ userEmail });
    res.json(items);
  } catch (err) {
    res.json([]);
  }
});
// Remove item from cart
router.post("/remove", async (req, res) => {
  const { itemId } = req.body;

  await Cart.findByIdAndDelete(itemId);

  res.json({ success: true, message: "Item removed from cart" });
});

module.exports = router;
