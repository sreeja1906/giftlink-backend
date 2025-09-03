// seed.js
const { connectToDatabase, client } = require("./models/db");

async function run() {
  try {
    const db = await connectToDatabase();
    const gifts = db.collection("gifts");

    // Clear then seed 16 docs
    await gifts.deleteMany({});
    await gifts.insertMany([
      { name: "Gift Card", category: "cards", price: 50 },
      { name: "Flowers", category: "flowers", price: 20 },
      { name: "Chocolate Box", category: "food", price: 15 },
      { name: "Coffee Mug", category: "home", price: 12 },
      { name: "Plush Bear", category: "toys", price: 25 },
      { name: "Scented Candle", category: "home", price: 18 },
      { name: "Notebook", category: "stationery", price: 8 },
      { name: "Pen Set", category: "stationery", price: 14 },
      { name: "Book: Sci-Fi", category: "books", price: 22 },
      { name: "Headphones", category: "electronics", price: 45 },
      { name: "Bluetooth Speaker", category: "electronics", price: 35 },
      { name: "Perfume", category: "beauty", price: 60 },
      { name: "Necklace", category: "jewelry", price: 85 },
      { name: "Backpack", category: "bags", price: 40 },
      { name: "Water Bottle", category: "fitness", price: 16 },
      { name: "Yoga Mat", category: "fitness", price: 30 }
    ]);

    console.log("✅ Seed complete: inserted 16 gifts");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
