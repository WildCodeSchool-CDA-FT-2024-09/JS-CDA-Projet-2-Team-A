import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

interface ModalFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: T) => void;
  title: string;
  fields: {
    name: keyof T;
    label: string;
    type?: string;
    defaultValue?: string | number;
    options?: { value: string; label: string }[];
  }[];
}

export default function ModalForm<T>({
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
        {fields.map((field) =>
          field.options ? (
            <TextField
              key={field.name as string}
              name={field.name as string}
              label={field.label}
              select
              value={formData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 3, mt: 1 }}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              key={field.name as string}
              name={field.name as string}
              label={field.label}
              value={formData[field.name] || ""}
              onChange={handleChange}
              type={field.type || "text"}
              fullWidth
              sx={{ mb: 3, mt: 1 }}
            />
          ),
        )}
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
