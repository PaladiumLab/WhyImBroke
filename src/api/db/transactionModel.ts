import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['expense', 'income', 'transfer'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    description: String,
    source: {
        type: String,
        enum: ['plaid', 'csv', 'manual'],
    },
    plaidAccountId: String, //Make sure this id is same one linked to your Plaid Account
    tags: [String],
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: [Number]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transactions', transactionsSchema);