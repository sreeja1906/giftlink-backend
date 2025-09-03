const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");
const { ObjectId } = require("mongodb");

// GET /api/gifts  -> list all gifts
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find().toArray();
    res.json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/gifts/:id -> single gift
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection("gifts").findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ message: "Gift not found" });
    res.json(gift);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;
