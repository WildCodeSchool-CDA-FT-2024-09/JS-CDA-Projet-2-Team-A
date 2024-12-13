import { Router } from "express";
import multer from 'multer';
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
});

const upload = multer({ storage });

console.info("je suis upload :", upload)

export const uploadRoutes = router;