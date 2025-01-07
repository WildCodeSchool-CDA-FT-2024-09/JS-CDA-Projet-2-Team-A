import express, {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import path from "path";
import { uploadRoutes } from "./routes/upload.routes";

dotenv.config(); // ? Loads environment variables from a .env file into `process.env`.

const app = express();

// * Middleware to parse JSON requests
app.use(express.json());

// * Serves the uploads folder as a static directory
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
app.use("/uploads", express.static(path.resolve(uploadDir)));

// * Registers the upload routes for handling file uploads
app.use("/upload", uploadRoutes);

// * Global error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // * Handles unsupported file type errors
  if (err.message === "Type de fichier non supporté.") {
    res.status(400).send({ message: err.message });
  } else {
    // * Handles all other server errors
    res.status(500).send({ message: "Une erreur interne est survenue." });
  }
});

const PORT = process.env.PORT; // ? Gets the server port from environment variables

// * Starts the server unless the environment is "test"
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.info(`🚀  Uploads ready at: http://localhost:${PORT}`) // ? Logs the server URL when running
  })
}

// * Exports the app for testing or integration with other modules
export { app };