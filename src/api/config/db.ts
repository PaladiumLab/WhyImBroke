import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define environment variable types
declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    // Add other env vars you use, e.g., PORT, NODE_ENV
  }
}

const connectDB = async(): Promise<void> => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

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