/**
 * Author: Gurleen Wadhwa
 * Date: March 14, 2025
 *
 * The accountService will house all the required DB calls for our HTTP method calls.
 */

import { Types } from "mongoose";
import { AccountsModel } from "../db/accountModel"
import { Account, createAccountType } from "../zod-schemas/accountZodSchemas";

export const getAllAccounts = async (userId: String):Promise<Account[]> => {
    //We need to search all accounts in DB, where our userId is equal to the account's userId.

    try {
        const allAccounts = await AccountsModel.find({userId: userId});
        return allAccounts;
    } catch (error) {
        console.error("Error getting all account", error);
    }
}

export const createAccount = async(userId: string, newAccountInput: createAccountType) => {
    //We need to simply create a new document using the userInfo passed from
    try {
        const newAccount = await AccountsModel.create({
            ...newAccountInput,
            userId: new Types.ObjectId(userId),
            currentAccountBalance: newAccountInput.initialAccountBalance,
            plaidAccountId: null,
            lastSync: new Date(),
            isActive: true

        })

        return newAccount
    } catch (error) {
        console.error("Error creating account", error);
    }
}

export const editAccount = async(userId: String) => {

}

export const deleteAccount = async(userId: String) => {

}
