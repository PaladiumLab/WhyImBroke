// src/server/server.ts
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db';
import rootRouter from './routes/rootRouter';

// Define a custom error type
interface CustomError extends Error {
  statusCode?: number;
}

// Load environment variables
dotenv.config()
console.log(dotenv.config());

// Connect to MongoDB
connectDB();

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(mongoSanitize()); // Prevent NoSQL injection

// Routes
app.use('/api/v1', rootRouter);

// Rate limiting
const limiter: RateLimitRequestHandler = rateLimit({
  max: 100, // Max 100 requests from an IP
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Custom error handling middleware
const errorHandler: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
app.use(errorHandler);

// Start the server
const PORT = process.env.BACKEND_PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;