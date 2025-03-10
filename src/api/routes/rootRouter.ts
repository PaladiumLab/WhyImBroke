import express from "express";
import authRouter from "./authRouter.ts";

const router = express.Router();

//All route handlers will be written here.
// router.use("/auth", userRouter);
router.use("/auth", authRouter);

export default router;