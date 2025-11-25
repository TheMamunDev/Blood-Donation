import mongoose from 'mongoose';
require('dotenv').config();

const MONGODB_URI = String(process.env.MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let isConnectedDB = false;
async function connectDB() {
  if (isConnectedDB) {
    return;
  }
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    isConnectedDB = true;
    return conn;
  } catch (e) {
    throw new Error(e);
  }
}

export default connectDB;
