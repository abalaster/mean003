import { MongoClient } from 'mongodb';

const defaultUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const defaultDbName = process.env.MONGODB_DB || 'mean003';

let client = null;
let db = null;

export async function connectToDatabase(uri = defaultUri, dbName = defaultDbName) {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed.');
  }
}
