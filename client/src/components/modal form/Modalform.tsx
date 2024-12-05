import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

// Generic Modal Props
interface ModalFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: T) => void;
  title: string;
  fields: { name: keyof T; label: string; type?: string }[];
}

export default function Modalform<T>({
  open,
  onClose,
  onSubmit,
  title,
  fields,
}: ModalFormProps<T>) {
  const [formData, setFormData] = useState<T>({} as T);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData({} as T);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <TextField
            key={field.name as string}
            name={field.name as string}
            label={field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            type={field.type || "text"}
            fullWidth
            sx={{ mb: 2 }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
