import { useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import DashboardList from "../../components/DashboardList/DashboardList";
import { Box, Typography, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

// TODO : import de fichiers json en attendant d'avoir la connexion à la BDD
import users from "../../../../server/data/mock/users.json";
import roles from "../../../../server/data/mock/roles.json";

const rolesName = new Map(roles.map((role) => [role.id, role.role]));
export default function AdminHomePage() {
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});

  const handleClickShowPassword = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nom", width: 250 },
    { field: "role", headerName: "Rôle", width: 250 },
    { field: "login", headerName: "Login", width: 250 },
    {
      field: "password",
      headerName: "Mot de passe",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {showPassword[params.id as number] ? params.value : "**************"}
          <Button
            onClick={() => handleClickShowPassword(params.id as number)}
            sx={{ ml: 1, minWidth: "auto", padding: "4px" }}
          >
            {showPassword[params.id as number] ? (
              <VisibilityOff sx={{ color: "#383E49" }} />
            ) : (
              <Visibility sx={{ color: "#383E49" }} />
            )}
          </Button>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <SettingsIcon
          sx={{
            textAnchor: "right",
          }}
        />
      ),
    },
  ];

  // TODO : Données à changer une fois la connexion à la BDD réalisée
  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
    password: user.password,
  }));

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
        <Button
          variant="contained"
          type="submit"
          sx={{
            height: "40px",
          }}
        >
          Ajouter un utilisateur
        </Button>
      </Box>
      <DashboardList columns={columns} data={data} />
    </Box>
  );
}
