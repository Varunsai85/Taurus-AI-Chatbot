import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected:${conn.connection.host}`);
    } catch (error) {
        console.log(`Error conecting DB:${error.message}`);
    }
};