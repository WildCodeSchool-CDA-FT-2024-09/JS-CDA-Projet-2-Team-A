import { useState } from "react";
import SideNavBar from "../../components/SideNavbar/SideNavBar.tsx";
import DashboardList from "../../components/DashboardList/DashboardList";
import { Box, Typography, Button } from "@mui/material";
import Modalform from "../../components/modal form/Modalform.tsx";
import users from "../../../../server/data/mock/users.json";
import roles from "../../../../server/data/mock/roles.json";

// Types for User
interface NewUser {
  name: string;
  login: string;
  password: string;
  role: number;
  email: string;
}

interface ExistingUser {
  id: number;
  name: string;
  login: string;
  role: number;
  email: string;
}

const rolesName = new Map(roles.map((role) => [role.id, role.role]));

export default function AdminHomePage() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<ExistingUser[]>(
    users.map((user, index) => ({
      id: index + 1, // Ensure each existing user gets an ID
      name: user.name,
      role: user.role,
      login: user.login,
      email: user.email,
    })),
  );

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 250 },
    { field: "role", headerName: "Rôle", width: 250 },
    { field: "login", headerName: "Login", width: 250 },
  ];

  const data = userData.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddUser = (formData: NewUser) => {
    setUserData([
      ...userData,
      {
        id: userData.length + 1, // Auto-generate ID
        name: formData.name,
        role: Array.from(rolesName.keys())[0], // Default role ID
        login: formData.login,
        email: formData.email,
      },
    ]);
    handleClose();
  };

  return (
    <>
      <SideNavBar />
      <Box
        sx={{
          marginLeft: "13dvw",
          padding: "10px",
        }}
      >
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mt: 3,
              mb: 3,
            }}
          >
            Liste des utilisateurs
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              height: "40px",
            }}
          >
            Ajouter un utilisateur
          </Button>
        </Box>
        <DashboardList columns={columns} data={data} />
      </Box>
      <Modalform<NewUser>
        open={open}
        onClose={handleClose}
        onSubmit={handleAddUser}
        title="Ajouter un utilisateur"
        fields={[
          { name: "name", label: "Nom" },
          { name: "role", label: "Role" },
          { name: "email", label: "Email" },
        ]}
      />
    </>
  );
}
