export const uploadImage = async (file: File): Promise<string> => {
  const baseUrl = import.meta.env.VITE_UPLOAD_BASE_URL;

  console.info("Base URL for uploads:", baseUrl);
  console.info("Upload URL:", `${baseUrl}/upload`);

  if (!baseUrl) {
    throw new Error("VITE_UPLOAD_BASE_URL is not defined");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseUrl}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Echec du téléchargement de l'image.");
  }

  const data = await response.json();
  return data.filePath;
};
