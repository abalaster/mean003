import { ObjectId } from 'mongodb';
import { getDb } from '../db/connection';

const COLLECTION = 'users';

export async function getAllUsers() {
  const db = getDb();
  return db.collection(COLLECTION).find({}).toArray();
}

export async function getUserById(id) {
  const db = getDb();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

export async function createUser(userData) {
  const db = getDb();
  const result = await db.collection(COLLECTION).insertOne(userData);
  return result;
}

export async function updateUser(id, updates) {
  const db = getDb();
  const result = await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result;
}

export async function deleteUser(id) {
  const db = getDb();
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return result;
}
