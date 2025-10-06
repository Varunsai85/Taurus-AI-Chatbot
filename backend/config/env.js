import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GEMINI_API_KEY,
  FRONTEND_URL,
  BACKEND_URL
} = process.env;
