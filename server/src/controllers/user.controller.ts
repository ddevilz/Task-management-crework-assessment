import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model";
import { Request, Response } from "express";
import { invalidateToken } from "../middleware/auth.middleware";

const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields required!" });
    return;
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({ name, email, password });

  const token = user.generateJWTToken();

  res.cookie("token", token, cookieOptions);
  res.setHeader("Authorization", `Bearer ${token}`);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields required!" });
    return;
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = user.generateJWTToken();

  res.cookie("token", token, cookieOptions);
  res.setHeader("Authorization", `Bearer ${token}`);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export const logout = (req: Request, res: Response) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    invalidateToken(token);
  }
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
};
