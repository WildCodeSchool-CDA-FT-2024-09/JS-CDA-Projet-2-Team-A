import DashboardList from "../../components/DashboardList/DashboardList";
import { Box, Typography, Button, Switch } from "@mui/material";

// TODO : import de fichiers json en attendant d'avoir la connexion à la BDD
import users from "../../../../server/data/mock/users.json";
import roles from "../../../../server/data/mock/roles.json";

const rolesName = new Map(roles.map((role) => [role.id, role.role]));
export default function AdminHomePage() {
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

  // TODO : Données à changer une fois la connexion à la BDD réalisée
  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.email,
    //activationDate: user.date,
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
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            type="submit"
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
      <DashboardList columns={columns} data={data} />
    </Box>
  );
}
