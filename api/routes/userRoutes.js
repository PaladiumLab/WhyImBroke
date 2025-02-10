import { Router } from "express";
import Users from "../db/userModel.js";
import jwt from "jsonwebtoken"
import authMiddleware from "../middlewares/authMiddleware.js"

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
        // 1. Find the user by email ONLY.  We also need to explicitly select the password field
        //    because we set 'select: false' in the schema to hide it by default.
        const user = await Users.findOne({email: email}).select('+password');

        if(user === null || user === undefined || !user){
            res.status(401).json({
                error: "Invalid credentials or User does not exist!"
            })
        }

        //Checking if the user's input password and matchPassword function returns true
        const isPasswordMatch = await user.matchPassword(password);

        if(isPasswordMatch){
            var token = jwt.sign({email}, process.env.JWT_SECRET);

            res.status(200).json({
                token: token,
                message: "User Logged in Successfully!"
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

router.get("/api/v1/auth/me", authMiddleware ,async (req,res) => {
    const email = req.email;
    try {
        const user = await Users.findOne({email: email});
        console.log(user);
        if(user !== null || user !== undefined){
            res.status(200).json({
                user: user
            })
        }else{
            res.status(401).json({
                error: "There is an error in retrieving Account Details at the moment!"
            })
        }
    } catch (error) {
        res.status(200).json({
            error: error
        })
    }
})

export default router;