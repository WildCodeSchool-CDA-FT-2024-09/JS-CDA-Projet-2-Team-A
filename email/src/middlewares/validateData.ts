import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const schema = z.object({
  to: z.string().email(),
  subject: z.enum(["Première connexion", "Mot de passe oublié"]),
  loginUrl: z.string().url(),
  firstname: z.string(),
  content: z.string(),
});

export const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    if (schema.parse(data)) next();
  } catch (error) {
    next(error);
  }
};
