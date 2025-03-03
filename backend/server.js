import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/auth",authRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});