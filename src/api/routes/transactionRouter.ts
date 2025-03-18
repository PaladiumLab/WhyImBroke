import { Request, Response, Router } from "express";
import { TransactionService } from "../services/transactionService";
import { ZodError } from "zod";

import authMiddleware from "../middlewares/authMiddleware";
import { manualTransactionInputSchema } from "../zod-schemas/transactionZodSchemas";

const router = Router();
const transactionService = new TransactionService();

router.post("/create", authMiddleware, async (req: Request, res: Response) => {
    try{
        const parsedTransactionInput = manualTransactionInputSchema.safeParse(req?.body);

        if(!parsedTransactionInput.success){
            res.status(403).json({
                message: "Validation Error",
                error: parsedTransactionInput.error.format()
            })
            return
        }

        const userId = req.user?.id;
        const transaction = await transactionService.AddManualTransaction(userId, parsedTransactionInput.data);

        if(transaction === null){
            res.status(403).json({message: "Error! Cannot create a new Transaction."})
        }
        res.status(201).json({
            message: "Transaction created successfully",
            transaction: transaction
        });
    }catch(error){
        if(error instanceof ZodError){
            res.status(400).json({ error: error.errors.map(e => e.message).join(",")});
        }else {
            res.status(400).json({error: (error as Error).message});
        }
    }
});

router.get("/getAllTransactions", async (req: Request, res: Response) => {

});

export default router;