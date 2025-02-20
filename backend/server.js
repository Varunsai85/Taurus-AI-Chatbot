import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Welcome to Taurus");
})

app.use("/api/auth",authRoutes);

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Listening on http://localhost:${PORT}`);
    connectDB();
})