import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Switch,
} from "@mui/material";
import {
  useCreateUserMutation,
  useGetAllRolesQuery,
  useAllUsersQuery,
} from "../../generated/graphql-types";
import ModalForm from "../../components/modalForm/Modalform";
import DashboardList from "../../components/DashboardList/DashboardList";

export default function AdminHomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [createUser] = useCreateUserMutation();

  // Fetch roles for the modal form
  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError,
  } = useGetAllRolesQuery();

  // Fetch all users for the dashboard
  const {
    data,
    loading: usersLoading,
    error: usersError,
    refetch,
  } = useAllUsersQuery();

  // Handle form submission for user creation
  const handleUserSubmit = async (formData: {
    name: string;
    email: string;
    role: string;
  }) => {
    try {
      await createUser({
        variables: {
          body: {
            name: formData.name,
            email: formData.email,
            roleName: formData.role,
          },
        },
      });
      await refetch();
      setOpenSnackbar(true);
      setSnackbarMessage("Utilisateur ajouté avec succès");
      setOpenModal(false);
    } catch {
      setOpenSnackbar(true);
      setSnackbarMessage("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  // Prepare user data for the dashboard
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

  // Prepare the data for the grid
  const dataGridUser =
    data?.allUsers?.map((user, index) => ({
      id: index + 1,
      name: user.name,
      role: user.role?.role || "Non défini",
      login: user.email,
      activationDate: new Date(user.activationDate).toLocaleDateString(),
      isActive: user.isActive,
    })) || [];

  // Handle loading and error states
  if (usersLoading || rolesLoading)
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
        Chargement en cours...
      </Typography>
    );

  if (usersError || rolesError)
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
        Une erreur est survenue lors du chargement des données.
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
              onClick={() => setOpenModal(true)}
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
        <DashboardList columns={columns} data={dataGridUser} />

        {/* Modal for Creating a User */}
        <ModalForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleUserSubmit}
          title="Ajouter un utilisateur"
          fields={[
            {
              name: "name",
              label: "Nom",
              type: "text",
            },
            {
              name: "email",
              label: "Email",
              type: "text",
            },
            {
              name: "role",
              label: "Rôle",
              options: rolesData?.getAllRoles?.map((role) => ({
                value: role.role,
                label: role.role,
              })),
            },
          ]}
        />

        {/* Snackbar for Success/Error Feedback */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ marginTop: "2rem" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarMessage.includes("Erreur") ? "error" : "success"}
            sx={{
              width: "25rem",
              fontSize: "1.125rem",
              padding: "1rem",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
}
