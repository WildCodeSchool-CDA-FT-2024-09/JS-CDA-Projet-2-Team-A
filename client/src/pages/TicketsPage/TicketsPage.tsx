import { ReactElement, useState } from "react";
import { ApolloError } from "@apollo/client";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import TicketsList from "../../components/Tickets/TicketsList.tsx";
import { useUser } from "../../contexts/UserContext.tsx";
import ModalForm from "../../components/modalForm/Modalform.tsx";
import { useCreateMessageMutation } from "../../generated/graphql-types.ts";
import { useMessageContext } from "../../contexts/MessageContext.tsx";

export default function TicketsPage(): ReactElement {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {
    user: { role },
  } = useUser();
  const { refetchAllMessages } = useMessageContext();
  const [createMessageMutation] = useCreateMessageMutation();

  const handleNewMessage = async (formData: {
    title: string;
    text: string;
  }) => {
    try {
      const response = await createMessageMutation({
        variables: {
          body: {
            title: formData.title,
            message: formData.text,
          },
        },
      });
      if (response?.data?.createMessage) {
        setOpenSnackbar(true);
        setSnackbarMessage(response.data.createMessage);
        refetchAllMessages();
        setOpenModal(false);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const detailedErrors = error.graphQLErrors[0].extensions
          ?.formattedErrors as string[];

        if (detailedErrors) {
          const finalErrorMessage = `${error.message}:\n${detailedErrors.join("\n")}`;
          setOpenSnackbar(true);
          setSnackbarMessage(finalErrorMessage);
        } else {
          setOpenSnackbar(true);
          setSnackbarMessage(error.message);
        }
      }
    }
  };
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
        bgcolor: "white",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6" component="h2">
          Tickets
        </Typography>
        {role === "atelier" && (
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{
              height: "40px",
              textTransform: "none",
            }}
          >
            Nouveau ticket
          </Button>
        )}
      </Box>
      <TicketsList role={role} />

      <ModalForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleNewMessage}
        mode="add"
        title="Nouveau ticket"
        fields={[
          {
            name: "title",
            label: "Titre du message (4-50 caractères)",
          },
          {
            name: "text",
            label: "Corps du message (4-140 caractères)",
          },
        ]}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={snackbarMessage.includes("succès") ? 3000 : 7000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ marginTop: "2rem" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes("succès") ? "success" : "error"}
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
