import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

/*eslint-disable no-console*/

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'sample_mflix';
const defaultPassword = process.env.SEED_PASSWORD || 'password';

async function seedPasswords() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const hash = await bcrypt.hash(defaultPassword, 12);
    const result = await db.collection('users').updateMany(
      {},
      { $set: { password: hash } }
    );

    console.log('Updated ' + result.modifiedCount + ' users with password: ' + defaultPassword);
  } catch (err) {
    console.error('Error seeding passwords:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedPasswords();
