import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('connecting', () => {
  console.log('Attempting MongoDB connection...')
})

mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err)
})

export default connectDB;