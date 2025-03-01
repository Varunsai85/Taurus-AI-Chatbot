import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import passport from "../config/auth.passport.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up",signUp);
authRoutes.post("/sign-in",signIn);
authRoutes.post("/sign-out",signOut);
authRoutes.get("/google",passport.authenticate('google',{scope:['profile']}));
authRoutes.get("/google/callback",passport.authenticate('google',{failureRedirect:"/login"}),function(req,res){
    res.redirect("/");
});


export default authRoutes;