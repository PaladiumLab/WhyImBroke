// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());  // Security headers
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(mongoSanitize()); // Prevent NoSQL injection

// Routes
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/transactions', transactionRoutes);
// app.use('/api/v1/budgets', budgetRoutes);

// Rate limiting
const limiter = rateLimit({
  max: 100, // Max 100 requests from an IP
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});