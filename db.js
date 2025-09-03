const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("giftlink");
    console.log("✅ MongoDB connected");
  }
  return db;
}

module.exports = { connectToDatabase, client };  // <-- export client
