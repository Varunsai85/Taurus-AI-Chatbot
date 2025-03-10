import express from "express";
import cookieParser from "cookie-parser";
import { FRONTEND_URL, PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV==="development"?"http://localhost:5173":FRONTEND_URL,
    credentials: true,
  })
);

app.get("/",(req,res)=>{
  res.send("Hello to Taurus AI backend server")
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
