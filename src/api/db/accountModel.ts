import mongoose, { Schema } from "mongoose";
import { Account } from "../zod-schemas/accountZodSchemas";

const accountsSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    accountType:{
        type: String,
        enum: ["savings", "checkings"]
    },
    accountName: {
        type: String,
        required: true
    },
    currentAccountBalance: {
        type: Number,
        required: true
    },
    initialAccountBalance: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        enum: ['CAD', 'USD', 'INR'],
        required: true
    },
    plaidAccountId: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false
    },
    lastSync:{
        type: Date,
        required: false
    }
}, { timestamps: true}
);

export const AccountsModel =  mongoose.model<Account>('Accounts', accountsSchema);