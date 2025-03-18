// src/zod-schemas/transactionSchemas.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Core transaction schema (shared across app)
export const transactionSchema = z.object({
  userId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), { message: 'Invalid userId' }),
  accountId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), { message: 'Invalid accountId' }),
  amount: z.number(),
  transaction_type: z.enum(['expense', 'income', 'transfer']),
  category: z.string().optional().refine(val => !val || mongoose.Types.ObjectId.isValid(val), { message: 'Invalid category' }),
  description: z.string().optional(),
  source: z.enum(['plaid', 'csv', 'manual', 'splitwise']),
  plaidAccountId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  metadata: z.array(z.record(z.any())).default([]), // Array of objects, matching Mongoose
});

// Type inferred from Zod schema (single source of truth)
export type Transaction = z.infer<typeof transactionSchema>;

// Input schema Validator for manual adapter (subset of full schema)
// As we add more support for adapter, new schemas we will be added to accomodate the  splitwise, plaid, csv.
export const manualTransactionInputSchema = transactionSchema.omit({
  userId: true, // Provided by auth
  source: true, // Fixed as 'manual'
  metadata: true, // Constructed in adapter
}).extend({
  amount: z.string().transform(val => {
    const parsed = Number(val);
    if (isNaN(parsed)) throw new Error('Amount must be a valid number');
    return parsed;
  }),
});

export type ManualTransactionInput = z.infer<typeof manualTransactionInputSchema>;