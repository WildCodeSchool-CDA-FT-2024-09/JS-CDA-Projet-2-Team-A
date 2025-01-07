import { Router, Request, Response } from "express";
import multer from 'multer';
import path from "path";

const router = Router();

// * Configuring Multer for file storage
const storage = multer.diskStorage({
  // * Specifies the folder where files will be stored
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR; // ? Uses an environment variable to define the upload directory
    if (!uploadDir) {
      throw new Error("La variable d'environnement UPLOAD_DIR doit être définie !");
    }
    cb(null, path.resolve(uploadDir)); // ? Resolves the path to the upload directory
  },
  // * Specifies how files will be named, adding a unique suffix to prevent naming conflicts
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // ? Timestamp and random number for uniqueness
    cb(null, `${uniqueSuffix}-${file.originalname}`) // ? File name: [timestamp]-[random]-[original name]
  },
});

// * Filtering accepted files
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"]; // ? List of accepted MIME types

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true); // ? Accepts the file if its MIME type is allowed
  }

  return cb(null, false); // ? Rejects the file
};

// * Configures Multer with the defined storage, file filter, and size limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // ? Sets a file size limit of 5 MB
});

// * Upload route with error handling
router.post("/", (req: Request, res: Response): void => {
  // * Handles file uploads using Multer's `single` middleware
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // * Handles specific Multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send({ message: "Le fichier est trop volumineux." });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({ message: "Type de fichier non supporté." });
      }
    } else if (err) {
      // * Handles any other server errors
      return res.status(500).send({ message: "Erreur serveur inattendue." });
    }

    if (!req.file) {
      // * Handles cases where no file was uploaded
      return res.status(400).send({ message: "Aucun fichier n'a été importé." });
    }

    // ? Successfully processes the uploaded file
    res.status(200).send({
      message: "Fichier importé avec succès.",
      filePath: `/uploads/${req.file.filename}`, // ? Provides the file's path
    });
  });
});

// * Exports the upload routes to be used in the main application
export const uploadRoutes = router;