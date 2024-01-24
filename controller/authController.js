import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../customerrors/customError.js";
import User from "../models/userModel.js";

import bcryptjs from "bcryptjs";
import { hashPassword } from "../utils/password.js";
import Jwt from "jsonwebtoken";
import { createJWT } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
// Register user
export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  const user_role = isFirstUser ? "admin" : "user";

  req.body.role = user_role;

  req.body.password = await hashPassword(req.body.password);

  if (!req.body) throw new BadRequestError("no user details to create account");

  const user = await User.create(req.body);

  if (!user) throw new BadRequestError("user not created successfully");

  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.CREATED).json({
    message: "user created successfully!",
    userWithoutPassword,
  });
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("user not found");

  const is_correct_password = await bcryptjs.compare(password, user.password);

  if (!is_correct_password)
    throw new UnauthenticatedError("wrong user credentials");

  const token = createJWT({ userId: user.id, userRole: user.role });

  res.cookie("token", token, process.env.JWT_SECRET, {
    expiresIn: new Date(Date.now()) + 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
  });

  res.status(StatusCodes.OK).json({
    message: "user logged in successfully",
  });
};

// Logout user
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({
    message: "user logout successfully",
  });
};
