import React, { useState } from "react";
import DashboardList from "../../components/DashboardList/DashboardList";
import {
  Box,
  Typography,
  Button,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

// TODO: Replace mock data with a database connection
import users from "../../../../server/data/mock/users.json";
import roles from "../../../../server/data/mock/roles.json";

// Types for User
interface NewUser {
  name: string;
  login: string;
  role: number;
  email: string;
}

const rolesName = new Map(roles.map((role) => [role.id, role.role]));

interface ModalFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: T) => void;
  title: string;
  fields: { name: keyof T; label: string; type?: string }[];
}

function Modalform<T>({
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

export default function AdminHomePage() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(
    users.map((user, index) => ({
      id: index + 1, // Ensure each existing user gets an ID
      name: user.name,
      role: user.role,
      login: user.login,
      activationDate: user.date || "N/A",
    })),
  );

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 250 },
    { field: "role", headerName: "Rôle", width: 250 },
    { field: "login", headerName: "Login", width: 250 },
    { field: "activationDate", headerName: "Date d'activation", width: 250 },
    {
      field: "actions",
      headerName: "Utilisateurs actifs",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: () => <Switch defaultChecked />,
    },
  ];

  const data = userData.map((user) => ({
    id: user.id,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
    activationDate: user.activationDate,
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddUser = (formData: NewUser) => {
    setUserData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        name: formData.name,
        role: formData.role,
        login: formData.login,
        email: formData.email,
        activationDate: new Date().toISOString().split("T")[0],
      },
    ]);
    handleClose();
  };

  return (
    <Box
      sx={{
        borderRadius: "5px",
      }}
    >
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#FFF",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mt: 3,
            mb: 3,
            color: "#383E49",
          }}
        >
          Liste des utilisateurs
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              height: "40px",
            }}
          >
            Ajouter un utilisateur
          </Button>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              height: "40px",
            }}
          >
            Modifier l'utilisateur
          </Button>
        </Box>
      </Box>
      <Modalform<NewUser>
        open={open}
        onClose={handleClose}
        onSubmit={handleAddUser}
        title="Ajouter un utilisateur"
        fields={[
          { name: "name", label: "Nom" },
          { name: "role", label: "Rôle", type: "number" },
          { name: "email", label: "Email" },
          { name: "login", label: "Login" },
        ]}
      />
      <DashboardList columns={columns} data={data} />
    </Box>
  );
}
