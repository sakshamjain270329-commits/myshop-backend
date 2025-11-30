const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register API
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.json({ success: true, message: "Registration successful" });
});

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  if (user.password !== password) {
    return res.json({ success: false, message: "Incorrect password" });
  }

  res.json({ success: true, message: "Login successful" });
});

module.exports = router;
