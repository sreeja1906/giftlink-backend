const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// GET /api/gifts/search?category=flowers
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const db = await connectToDatabase();

    const query = {};
    if (category) query.category = category;

    const results = await db.collection("gifts").find(query).toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
