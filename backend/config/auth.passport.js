import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import {
  BACKEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_EXPIRY,
  JWT_SECRET,
} from "./env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const googleStrategy = Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        process.env.NODE_ENV === "development" ? "http://localhost:5001"
      :BACKEND_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName || "",
            lastName: profile.name.familyName || "",
            email: profile.emails[0].value,
            password: null,
            profilePic: profile.photos[0].value,
          });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRY,
        });

        if (req && req.res) {
          req.res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          });
        }
        return done(null, { token, user });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
