import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createChat, getAllMessages, sendPrompt } from "../controllers/message.controller.js";
const messageRoutes=express.Router();

messageRoutes.get("/getMessages",protectRoute,getAllMessages);
messageRoutes.post("/send/:id",protectRoute,sendPrompt);
messageRoutes.post("/create",protectRoute,createChat);
messageRoutes.post("/sendDummy",sendPrompt);

export default messageRoutes;