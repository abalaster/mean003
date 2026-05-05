import crypto from 'crypto';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

/*eslint-disable no-console*/

/**
 * Password Hashing Methodology
 * =============================
 * 1. Random password generation:
 *    - Uses Node.js crypto.randomBytes() (CSPRNG) to generate 12 bytes
 *    - Encodes as base64 and takes 16 characters for a strong random password
 *    - Each user receives a unique password
 *
 * 2. Password hashing:
 *    - Algorithm: bcrypt (via bcryptjs library)
 *    - Cost factor: 12 rounds (2^12 = 4096 iterations)
 *    - bcrypt automatically generates a unique 128-bit salt per hash
 *    - Output format: $2b$12$<22-char salt><31-char hash> (60 chars total)
 *
 * 3. Storage:
 *    - Only the bcrypt hash is stored in the database
 *    - Plaintext passwords are printed to stdout for initial setup only
 *    - Output can be redirected to a file: npx babel-node buildScripts/seedPasswords.js > credentials.csv
 *
 * Why bcrypt?
 *    - Designed specifically for password hashing (unlike SHA-256, MD5)
 *    - Intentionally slow to resist brute-force attacks
 *    - Built-in salt prevents rainbow table attacks
 *    - Cost factor is tunable to increase work as hardware improves
 */

const BCRYPT_ROUNDS = 12;
const PASSWORD_LENGTH = 16;

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'sample_mflix';

function generatePassword() {
  return crypto.randomBytes(12).toString('base64').slice(0, PASSWORD_LENGTH);
}

async function seedPasswords() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const users = await db.collection('users').find(
      {},
      { projection: { _id: 1, name: 1, email: 1 } }
    ).toArray();

    console.log('email,name,password');

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var plaintext = generatePassword();
      var hash = await bcrypt.hash(plaintext, BCRYPT_ROUNDS);

      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { password: hash } }
      );

      console.log(user.email + ',' + (user.name || '') + ',' + plaintext);
    }

    console.error('Seeded ' + users.length + ' users with unique random passwords (bcrypt, ' + BCRYPT_ROUNDS + ' rounds).');
  } catch (err) {
    console.error('Error seeding passwords:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedPasswords();
