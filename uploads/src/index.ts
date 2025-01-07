import express, {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import path from "path";
import { uploadRoutes } from "./routes/upload.routes";

dotenv.config();

const app = express();

// * Middleware to parse JSON requests
app.use(express.json());

// * Set the uploads folder as static
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
app.use("/uploads", express.static(path.resolve(uploadDir)));

// * Use upload routes
app.use("/upload", uploadRoutes);

// * Global error management
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Type de fichier non supporté.") {
    res.status(400).send({ message: err.message });
  } else {
    res.status(500).send({ message: "Une erreur interne est survenue." });
  }
});

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.info(`🚀  Uploads ready at: http://localhost:${PORT}`)
  })
}

export { app };