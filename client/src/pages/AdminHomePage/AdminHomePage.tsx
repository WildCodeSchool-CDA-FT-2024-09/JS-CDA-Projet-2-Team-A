import { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useCreateUserMutation } from "../../generated/graphql-types";
import { useGetAllRolesQuery } from "../../generated/graphql-types";
import ModalForm from "../../components/modalForm/Modalform";

export default function AdminHomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [createUser] = useCreateUserMutation();

  // Fetch roles
  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError,
  } = useGetAllRolesQuery();

  // Handle form submission for user creation
  const handleUserSubmit = async (formData: {
    name: string;
    login: string;
    role: string;
  }) => {
    try {
      await createUser({
        variables: {
          body: {
            name: formData.name,
            login: formData.login,
            roleName: formData.role,
          },
        },
      });
      setOpenSnackbar(true);
      setSnackbarMessage("Utilisateur ajouté avec succès");
      setOpenModal(false);
    } catch {
      setOpenSnackbar(true);
      setSnackbarMessage("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  return (
    <Box sx={{ borderRadius: "5px" }}>
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
          sx={{ mt: 3, mb: 3, color: "#383E49" }}
        >
          Liste des utilisateurs
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{ height: "40px" }}
          >
            Ajouter un utilisateur
          </Button>
          <Button variant="outlined" sx={{ height: "40px" }}>
            Modifier l'utilisateur
          </Button>
        </Box>
      </Box>

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
            name: "login",
            label: "Login",
            type: "text",
          },
          {
            name: "role",
            label: "Rôle",
            options: rolesLoading
              ? []
              : rolesError
                ? []
                : rolesData?.getAllRoles?.map((role) => ({
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
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes("Erreur") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
