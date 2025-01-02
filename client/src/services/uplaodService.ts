const UPLOAD_BASE_URL = import.meta.env.VITE_UPLOAD_BASE_URL;

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${UPLOAD_BASE_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Echec du téléchargement de l'image.");
    }

    const result = await res.json();
    return result.filePath;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image", error);
    throw error;
  }
};
