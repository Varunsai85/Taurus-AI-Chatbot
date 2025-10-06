import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB conected:${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};