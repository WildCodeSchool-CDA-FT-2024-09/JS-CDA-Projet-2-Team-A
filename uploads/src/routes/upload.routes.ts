import { Router, Request, Response } from "express";
import multer from 'multer';
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR;
    if (!uploadDir) {
      throw new Error("La variable d'environnement UPLOAD_DIR doit être définie !");
    }
    cb(null, path.resolve(uploadDir));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // * Acceptation du fichier si les conditions sont respectées
  } else {
    cb(new Error("Type de fichier non supporté. Seuls les formats .png, .jpg et .jpeg sont autorisés."));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

console.info("je suis upload :", upload)

router.post("/", upload.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).send({ message: "Aucun fichier importé ou type de fichier incorrect." });
    return;
  }

  res.status(200).send({
    message: "Fichier importé avec succès.",
    filePath: `/uploads/${req.file.filename}`,
  });
});

export const uploadRoutes = router;