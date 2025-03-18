import mongoose from "mongoose";
import { TransactionAdapter } from "./transactionParentAdapter";
import { TransactionModel, TransactionDoc } from "../db/transactionModel";
import { manualTransactionInputSchema, ManualTransactionInput, Transaction } from '../zod-schemas/transactionZodSchemas';

export class ManualAdapter implements TransactionAdapter {
    async fetchTransactions(): Promise<Transaction[]> {
        throw new Error("Manual adapter does not support fetching transactions");
    }

    //The normalizeTransaction already recieves a safe parsed data because of router level zod validation.
    normalizeTransaction(parsedData: any): Transaction{

        return {
            userId: '',
            accountId: parsedData.accountId,
            amount: parsedData.amount,
            transaction_type: parsedData.transaction_type,
            category: parsedData.category,
            description: parsedData.description,
            plaidAccountId: undefined,
            source: "manual",
            tags: parsedData.tags || [],
            metadata: [{ tags: parsedData.tags || [] }],
        };
    }

    async createTransaction(rawData: any, userId: string): Promise<TransactionDoc> {
        const normalized: Transaction = this.normalizeTransaction(rawData);
        const { accountId, tags } = rawData;

        if(!accountId) throw new Error("Missing required field: accountId");
        if (!mongoose.Types.ObjectId.isValid(accountId)) throw new Error('Invalid accountId format');

        const transactionData: Omit<TransactionDoc, '_id' | 'createdAt' | 'updatedAt'> = {
            userId: new mongoose.Types.ObjectId(userId),
            accountId: new mongoose.Types.ObjectId(normalized.accountId),
            amount: normalized.amount,
            transaction_type: normalized.transaction_type,
            category: normalized.category ? new mongoose.Types.ObjectId(normalized.category) : undefined,
            description: normalized.description,
            source: normalized.source,
            plaidAccountId: undefined,
            tags: normalized.tags,
            metadata: normalized.metadata,
        };

        return await TransactionModel.create(transactionData);
    }

}