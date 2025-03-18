import express from "express";
import authRouter from "./authRouter";
import transactionRouter from "./transactionRouter";
import accountRouter from "./accountRouter";

const router = express.Router();

//All Routers
router.use("/auth", authRouter);
router.use("/transactions", transactionRouter);
router.use("/account", accountRouter);

export default router;