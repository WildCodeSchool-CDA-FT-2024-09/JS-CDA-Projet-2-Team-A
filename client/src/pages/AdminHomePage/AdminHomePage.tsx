import DashboardList from "../../components/DashboardList/DashboardList";
import { useAllUsersQuery } from "../../generated/graphql-types";
import { Box, Typography, Button, Switch } from "@mui/material";

export default function AdminHomePage() {
  const { data, loading, error } = useAllUsersQuery();

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
  const dataGrid =
    data?.allUsers?.map((user, index) => ({
      id: index + 1,
      name: user.name,
      role: user.role?.role || "Non défini",
      login: user.email,
      activationDate: new Date(user.activationDate).toLocaleDateString(),
      isActive: user.isActive,
    })) || [];

  if (loading)
    return (
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mt: 3,
          mb: 3,
          color: "#383E49",
        }}
      >
        Le site il est tout pété c'est trop long à charger là !!
      </Typography>
    );

  if (error)
    return (
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mt: 3,
          mb: 3,
          color: "#383E49",
        }}
      >
        Le site il est tout pété, et en plus c'est bourré d'erreurs !!
      </Typography>
    );

  if (data)
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
        <DashboardList columns={columns} data={dataGrid} />
      </Box>
    );
}
