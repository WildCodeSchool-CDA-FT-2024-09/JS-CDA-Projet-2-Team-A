import request from "supertest";
import path from "path";
import { app } from "../index"

describe("Upload Route Test", () => {

  // * Test to check rejection of a file exceeding the size limit
  it("should reject a file exceeding the size limit", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", path.resolve(__dirname, "./test_files/large_image.jpg"));

    // * Check that the response status is 400 (Bad Request)
    expect(res.status).toBe(400);
    // * Check that the error message is correct
    expect(res.body).toHaveProperty("message", "Le fichier est trop volumineux.");
  })

  // * Test to check successful upload of a valid image file
  it("should successfully upload a valid image file", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", path.resolve(__dirname, "./test_files/image.jpg"));

    // * Check that the response status is 200 (OK)
    expect(res.status).toBe(200);
    // * Check that the success message is correct
    expect(res.body).toHaveProperty("message", "Fichier importé avec succès.");
    // * Check that the file path is returned
    expect(res.body).toHaveProperty("filePath");
  });

  // * Test to check rejection of an unsupported file type
  it("should reject an unsupported file type", async () => {
    try {
      const res = await request(app)
        .post("/upload")
        .attach("file", path.resolve(__dirname, "./test_files/document.pdf"));

      // * Check that the response status is 400 (Bad Request)
      expect(res.status).toBe(400);
      // * Check that the error message is correct
      expect(res.body).toHaveProperty("message", "Aucun fichier n'a été importé.");
    } catch (error) {
      throw error;
    }
  });

  // * Test to check rejection of a request without a file
  it("should reject a request without a file", async () => {
    const res = await request(app).post("/upload");

    // * Check that the response status is 400 (Bad Request)
    expect(res.status).toBe(400);
    // * Check that the error message is correct
    expect(res.body).toHaveProperty("message", "Aucun fichier n'a été importé.");
  });
});