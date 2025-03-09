import express from "express";
import { checkAuth, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import passport from "../config/auth.passport.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { FRONTEND_URL } from "../config/env.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up",signUp);
authRoutes.post("/sign-in",signIn);
authRoutes.post("/sign-out",signOut);
authRoutes.get("/google",passport.authenticate('google',{scope:['profile','email'],session:false}));
authRoutes.get("/google/callback",passport.authenticate('google',{failureRedirect:"/login",session:false}),function(req,res){
    res.redirect(`${process.env.NODE_ENV==="development"?"http:localhost:5173/":FRONTEND_URL}?success=true`);
});
authRoutes.get("/check",protectRoute,checkAuth);


export default authRoutes;