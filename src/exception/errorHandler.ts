import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import Logger from "../config/logger";
import { STATUS_CODES } from "http";

export function errorHandler(fn: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err instanceof AppError) {
        Logger.error(`[${err.statusCode}] Bad request: ${err.message}`);
        res.status(err.statusCode).json({
          message: err.message,
          statusCode: err.statusCode,
          error: err.name,
        });
        return;
      }
      Logger.error(`[500] Internal Server Error: ${(err as Error).message}`);
      res.status(500).json({
        ...(err as Error),
        message: (err as Error).message || "Internal Server Error",
      });
      return;
    }
  };
}
