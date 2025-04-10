import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import httpStatus from "http-status";

export * from "./githubProxy.validation.js";

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        query: req.query,
      });
      return next();
    } catch (error: any) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: error.issues[0].message,
      });
    }
  };
};
