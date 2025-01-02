import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ModalFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: T & { image?: File | null }) => void;
  mode: "add" | "edit";
  title: string;
  fields: {
    name: keyof T;
    label: string;
    type?: string;
    defaultValue?: string | number;
    options?: { value: string; label: string }[];
  }[];
  showImageField?: boolean;
  imageFieldName?: keyof T;
}

export default function ModalForm<T>({
  open,
  onClose,
  onSubmit,
  mode,
  title,
  fields,
  showImageField = false,
  imageFieldName = "imageUrl",
}: ModalFormProps<T>) {
  const [formData, setFormData] = useState<T>({} as T);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      const initialData = fields.reduce((acc, field) => {
        acc[field.name] = (field.defaultValue ?? "") as T[keyof T];
        return acc;
      }, {} as T);
      setFormData(initialData);
    }
  }, [open, fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFormSubmit = () => {
    onSubmit({ ...formData, image });
    setFormData({} as T);
    setImage(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* * Display when using an image in the modal */}
        <Grid container>
          {fields.map((field) => {
            if (field.name === imageFieldName && showImageField) {
              return (
                <Grid size={{ xs: 12 }} key={field.name as string}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "16px",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: "8px",
                        width: "96px",
                        height: "96px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Prévisualisation"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Typography
                          style={{
                            color: "#999",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          Aucun fichier sélectionné
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography style={{ color: "#666" }}>
                        Drag une image ici
                      </Typography>
                      <Typography style={{ color: "#666" }}>ou</Typography>
                      <Button variant="contained" component="label">
                        Importer une image
                        <input
                          type="file"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              );
            }
            return (
              <Grid size={{ xs: 12 }} key={field.name as string}>
                {field.options ? (
                  <TextField
                    name={field.name as string}
                    label={field.label}
                    select
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    name={field.name as string}
                    label={field.label}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    type={field.type || "text"}
                    fullWidth
                    sx={{ mb: 3, mt: 1 }}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          {mode === "add" ? "Ajouter" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
