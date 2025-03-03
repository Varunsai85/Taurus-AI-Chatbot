import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken;
        if(!token){
            const error=new Error("No token found");
            error.statusCode=404;
            throw error;
        };

        const decoded=jwt.verify(token,JWT_SECRET);
        if(!decoded){
            const error=new Error("Invalid token");
            error.statusCode=401;
            throw error;
        };

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            const error=new Error("User not found");
            error.statusCode=404;
            throw error;
        };

        req.user=user;
        next();
    } catch (error) {
        next(error);
    }
}