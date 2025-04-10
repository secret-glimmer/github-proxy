import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  _err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};
