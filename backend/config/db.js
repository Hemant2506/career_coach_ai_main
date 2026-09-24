import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB database using Mongoose
 */
export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/career_coach_ai';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });

    isConnected = true;
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ MongoDB connection note: Unable to connect to ${mongoURI} (${error.message}).`);
    console.warn('Backend will continue operating with safe mock/in-memory fallback data so the server remains fully functional.');
    return null;
  }
};

export const isDbConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};
