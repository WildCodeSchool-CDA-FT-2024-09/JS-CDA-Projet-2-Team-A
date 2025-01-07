import express from "express";
import dotenv from "dotenv";
import path from "path";
import { uploadRoutes } from "./routes/upload.routes";

dotenv.config();

const app = express();

app.use(express.json());

const uploadDir = process.env.UPLOAD_DIR || "./uploads";
app.use("/uploads", express.static(path.resolve(uploadDir)));

app.use((req, res, next) => {
  next();
});

app.use("/upload", uploadRoutes);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.info(`🚀  Uploads ready at: http://localhost:${PORT}`)
  })
}

export { app };