import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createAccount, getAllAccounts } from "../services/accountService";
import { ZodError } from "zod";
import { accountZodSchema, createAccountZodSchema } from "../zod-schemas/accountZodSchemas";

const router = Router();

router.get("/getAllAccounts", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const userAccounts = await getAllAccounts(userId);
        if(userAccounts === null){
            res.status(401).json({message: "No Accounts found"});
            throw new Error("Error in fetching Accounts: No account exists or incorrect userId detected.");
        }

        res.status(200).json({
            message: "Results found!",
            accounts: userAccounts
        });

    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({ error: error.errors.map(e => e.message).join(",")});
        }else {
            res.status(400).json({error: (error as Error).message});
        }
    }
});

router.post("/create", authMiddleware, async (req: Request, res: Response) => {
    try {
        //Zod Schema Validate:
        const parsedAccountInput = createAccountZodSchema.safeParse(req?.body);
        console.log(parsedAccountInput);
        if(!parsedAccountInput.success){
            res.status(403).json({
                message: "Validation Error",
                error: parsedAccountInput.error.format()
            })
        }

        const userId = req.user?.id;
        const userAccount = await createAccount(userId, parsedAccountInput.data);

        if(!userAccount){
            res.status(403).json({message: "Error! Cannot create a new Account."})
        }

        res.status(201).json({
            message: "Account Successfully Created!"
        })


    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({ error: error.errors.map(e => e.message).join(",")});
        }else {
            res.status(400).json({error: (error as Error).message});
        }
    }
});

router.put("/edit/:accountId", authMiddleware, async () => {

});

router.delete("/delete/:accountId", authMiddleware, async () => {

});

export default router;