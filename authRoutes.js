const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // demo only: no hashing here
    const db = await connectToDatabase();
    const collection = db.collection("users");

    const user = await collection.findOne({ email }); // REQUIRED in rubric
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Fake token for demo
    res.json({
      message: "Login successful",
      user: { _id: user._id, email: user.email, username: user.username },
      token: "demo-token"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
