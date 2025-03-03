import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from "../utils/jwt.utils.js";

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("User already exists");
      error.statusCode = 401;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = generateTokenAndCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
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
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateTokenAndCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User login Successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      const error = new Error("No token found");
      error.statusCode = 404;
      throw error;
    }

    res.clearCookie("accessToken");
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuth=async(req,res,next)=>{
  try {
    res.status(200).json({
      success:true,
      message:"User is authenticated",
      data:{
        user:req.user
      }
    });
  } catch (error) {
    next(error);
  }
}