import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Users from "../db/userModel";

interface JwtPayload {
    id: string;
    email?: string;
    iat: number;
    exp?: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //Here we get our JWT token as part of the headers in our request
    const authHeader = req.headers.authorization;

    //Checking if the authHeader is in the right format:
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ message: "No Token provided" })
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        //Now we verify and decode the JWT token to authenticate the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        //EDIT:
        // We now encode a user._id and not email now, this improves privacy.
        if(!decodedToken.id){
            res.status(401).json({message: "Token is missing user ID"});
            return;
        }

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError){
            res.status(401).json({message: "Invalid or expired token"});
        } else{
            res.status(500).json({ message: "Authentication error:", error: (error as Error).message });
        }
    }
}

export default authMiddleware