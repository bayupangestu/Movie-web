const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.MONGODB_ATLAS_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "cartier-byprajogo";
let db;

async function connect() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (error) {
    throw error;
  }
}

function getDatabase() {
  return db;
}

module.exports = { connect, getDatabase };

