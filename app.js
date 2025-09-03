// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./models/db");
const giftRoutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ===== Middlewares =====
app.use(cors({ origin: "http://localhost:3000" })); // adjust for frontend origin
app.use(express.json());

// ===== Database Connection =====
connectToDatabase()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection failed:", err));

// ===== Routes =====
app.use("/api/gifts/search", searchRoutes); // category filter
app.use("/api/gifts", giftRoutes);          // "/" and "/:id"
app.use("/api/auth", authRoutes);           // login, register, etc.

// ===== Health Check Route =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
