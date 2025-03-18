import { TransactionDoc } from "../db/transactionModel";
import { TransactionAdapter } from "../adapters/transactionParentAdapter";
import { ManualAdapter } from "../adapters/manual-adapter";
import { ManualTransactionInput, Transaction } from "../zod-schemas/transactionZodSchemas";

export class TransactionService {
    private adapter: Map<string, TransactionAdapter>;

    constructor(){
        this.adapter = new Map<string, TransactionAdapter>([
            ['manual', new ManualAdapter()],
            //We will be adding more adapters here as we add new adapters like CSV Adapter, Plaid Adapter, Splitwise Adapter.
        ]);
    }

    //Generic function to add Transaction using the source adapter.
    async AddTransaction(source: string, userId: string, rawData: any): Promise<any> {
        const adapter = this.adapter.get(source);
        if(!adapter){
            throw new Error(`No adapter found for source: ${source}`);
        }
        return await (adapter as ManualAdapter).createTransaction(rawData, userId);
    }

    async AddManualTransaction(userId: string, rawData: any): Promise<any> {
        return await this.AddTransaction('manual', userId, rawData);
    }

    // We don't use this function for our current implementation of manual transactions, instead for external APIs like Plaid, Splitwise
    async fetchTransactions(source: string): Promise<Transaction[]> {
        const adapter = this.adapter.get(source);
        if (!adapter) {
            throw new Error(`No adapter found for source: ${source}`);
        }

        return await adapter.fetchTransactions();
    }
}