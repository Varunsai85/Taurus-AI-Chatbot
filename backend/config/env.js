import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV||'development'}.local`});

export const {PORT,MONGODB_URI,JWT_SECRET}=process.env;