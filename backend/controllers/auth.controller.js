import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateTokenAndCookie = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("User Already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
      [{ firstName, lastName, email, password: hashedPassword }],
      { session }
    );

    const token = generateTokenAndCookie(res, user[0]._id);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        token,
        user: user[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateTokenAndCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(err);
  }
};

export const signOut = async (req, res, next) => {
    try {
        const accessToken=req.cookies.accessToken;

        if(!accessToken){
            const error=new Error('User not logged In');
            error.statusCode=401;
            throw error;
        };

        res.clearCookie('accessToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict'
        });

        res.status(200).json({
            success:true,
            message:'Logged Out successful'
        })
    } catch (error) {
        next(error)
    }
};