import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    return await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default dbConnect; 