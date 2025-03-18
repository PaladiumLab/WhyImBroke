import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Transaction } from "../zod-schemas/transactionZodSchemas";

const transactionsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    transaction_type: {
        type: String,
        required: true,
        enum: ['expense', 'income', 'transfer'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    description: String,
    source: {
        type: String,
        enum: ['plaid', 'csv', 'manual', 'splitwise'],
    },
    plaidAccountId: {
        type: String,
        required: false
    }, //Make sure this id is same one linked to your Plaid Account
    tags: [String],
    metadata:{
        type: [Object],
        default: []
    }
}, {
    timestamps: true
});

export type TransactionDoc = Omit<Transaction, 'userId' | 'accountId' | 'category'> & {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    accountId: mongoose.Types.ObjectId;
    category?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const TransactionModel =  mongoose.model<TransactionDoc>('Transactions', transactionsSchema);