import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const logErrors: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  console.error("on req:", req.method, req.url);
  res.status(400).json({ message: "Une erreur est survenue." });
};
