import express from "express";
import { register, login, logout } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

const UserRouter = express.Router();

UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.post("/logout", verifyToken, logout);

export default UserRouter;
