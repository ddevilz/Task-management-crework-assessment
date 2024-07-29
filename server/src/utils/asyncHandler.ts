import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

export const asyncHandler =
  (func: AsyncHandler) =>
  async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
