import { Router } from "express";
import UserRouter from "./user.routes";
import TaskRouter from "./task.routes";

const router = Router();

router.use("/user", UserRouter);
router.use("/task", TaskRouter);

export default router;
