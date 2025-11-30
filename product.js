const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add Product
router.post("/add", async (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = new Product({ name, price, description, image });

  await newProduct.save();
  res.json({ success: true, message: "Product added" });
});

// Get Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
