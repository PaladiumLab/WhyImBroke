// const { Router } = require("express");
// const { Users } = require("../db/userModel");

import { Router } from "express";
import Users from "../db/userModel.js";

const router = Router();

//User account creation routes
//1. User account registration - POST /api/v1/auth/signup
router.post("/api/v1/auth/signup", async ( req,res ) => {
    const { email, password, name} = req.body;

    try {
        //We first check if a user already exists for this email?
        const queryResults = await Users.findOne({ email: email });
        if(!queryResults){
            await Users.create({
                email: email,
                password: password,
                name: name
            });
            res.status(200).json({
                message: "User account created successfully!"
            });
        }else{
            res.status(409).json({
                message: "Email already registered to another account, User cannot be created! Use another email."
            })
        }
    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
});

export default router;