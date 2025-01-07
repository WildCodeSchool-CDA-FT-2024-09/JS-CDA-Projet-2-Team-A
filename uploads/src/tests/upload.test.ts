import request from "supertest";
import path from "path";
import { app } from "../index"

describe("Upload Route Test", () => {
  it("should successfully upload a valid image file", async () => {
    const res = await request(app)
      .post("/upload") // * Chemin de la route d'upload
      .attach("file", path.resolve(__dirname, "./test_files/image.jpg")); // * Exemple de fichier conforme

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Fichier importé avec succès.");
    expect(res.body).toHaveProperty("filePath");
  });

  it("should reject an unsupported file type", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", path.resolve(__dirname, "./test_files/document.pdf")); //* Exemple de fichier non conforme

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Type de fichier non supporté.");
  });

  it("should reject a request without a file", async () => {
    const res = await request(app).post("/upload"); // * Requête sans fichier

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Aucun fichier n'a été importé.");
  });
});