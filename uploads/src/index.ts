import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/upload", uploadRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`🚀  Uploads ready at: http://localhost:${PORT}`)
})