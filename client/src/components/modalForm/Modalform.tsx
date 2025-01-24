import React, { useState, useEffect } from "react";
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
    options?: { value: string | number; label: string }[];
  }[];
  showImageField?: boolean;
  imageFieldName?: keyof T;
}

export default function ModalForm<T extends Record<string, unknown>>({
  open,
  onClose,
  onSubmit,
  mode,
  title,
  fields,
  showImageField = false,
  imageFieldName = "image",
}: ModalFormProps<T>) {
  const [formData, setFormData] = useState<
    T & { image?: string | File | null }
  >({} as T);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // * Initializing form and image data
  useEffect(() => {
    if (open) {
      const initialData = fields.reduce((acc, field) => {
        acc[field.name] = (field.defaultValue ?? "") as T[keyof T];
        return acc;
      }, {} as T);
      setFormData(initialData);

      // * Default image review
      const defaultImage = fields.find((field) => field.name === imageFieldName)
        ?.defaultValue as string | undefined;
      setImagePreview(defaultImage || null);
    }
  }, [open, fields, imageFieldName]);

  // * Managing changes in text fields
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
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      setFormData((prevData) => ({
        ...prevData,
        [imageFieldName as keyof T]: file,
      }));
    }
  };

  // * Form submission
  const handleFormSubmit = () => {
    const formDataToSubmit = {
      ...formData,
      image: formData.image instanceof File ? formData.image : undefined,
    };
    onSubmit(formDataToSubmit as T & { image?: File | null | undefined });
    setFormData({} as T);
    setImagePreview(null);
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
                      {imagePreview ? (
                        <img
                          src={imagePreview}
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
