import { Transaction } from "../zod-schemas/transactionZodSchemas";

export interface TransactionAdapter {
    fetchTransactions(): Promise<Transaction[]>;
    normalizeTransaction(rawData: any): Transaction;
}