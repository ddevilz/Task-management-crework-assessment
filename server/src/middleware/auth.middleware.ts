import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

const blacklist: string[] = [];

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  email: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  if (blacklist.includes(token)) {
    return res.status(401).json({ message: "Token has been invalidated." });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as CustomJwtPayload;
    req.user = {
      id: decoded._id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired." });
    }
    res.status(400).json({ message: "Invalid token." });
  }
};

export const invalidateToken = (token: string) => {
  blacklist.push(token);
};
