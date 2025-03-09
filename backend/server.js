import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
