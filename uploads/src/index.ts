import express from "express";
import dotenv from "dotenv";
import { uploadRoutes } from "./routes/upload.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.info(`🚀  Uploads ready at: http://localhost:${PORT}`)
})