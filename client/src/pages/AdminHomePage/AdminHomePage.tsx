import SideNavBar from "../../components/SideNavbar/SideNavBar.tsx";
import TopBar from "../../components/TopBar/TopBar.tsx";
import DashboardList from "../../components/DashboardList/DashboardList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  ];

  // TODO : Données à changer une fois la connexion à la BDD réalisée
  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: rolesName.get(user.role),
    login: user.login,
  }));

  return (
    <>
      <SideNavBar />
      <Box
        sx={{
          marginLeft: "13dvw",
          padding: "10px",
        }}
      >
        <TopBar />
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
    </>
  );
}
