import { Router } from "express";
import Users from "../db/userModel.js";
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config/secret.js"

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

router.post("/api/v1/auth/login", async (req,res) => {
    const { email, password} = req.body;

    try {
        const user = await Users.findOne({
            email: email,
            password: password
        });

        if(user !== null || user !== undefined){
            var token = jwt.sign({email}, JWT_SECRET);

            res.status(200).json({
                token: token,
                message: "User Loggedin Successfully!"
            })
        }else{
            res.status(401).json({
                error: "Invalid credentials or User does not exist!"
            })
        }
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
})

export default router;