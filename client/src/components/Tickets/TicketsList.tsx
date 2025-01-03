import { ReactElement, useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { useMessageContext } from "../../contexts/MessageContext.tsx";
import Ticket from "./Ticket.tsx";
import TicketSkeleton from "./TicketSkeleton.tsx";
import ModalForm from "../modalForm/Modalform.tsx";
import {
  MessageStatus,
  useGetAllMessageStatusesQuery,
} from "../../generated/graphql-types.ts";
import { ApolloError } from "@apollo/client";

export default function TicketsList({ role }: { role: string }): ReactElement {
  const {
    messages,
    loadingMessages,
    errorMessages,
    refetch,
    updateMessageStatusMutation,
    idForModal,
  } = useMessageContext();
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { data: messageStatuses } = useGetAllMessageStatusesQuery();

  const handleStatusUpdate = async (formData: { status: string }) => {
    try {
      const response = await updateMessageStatusMutation({
        variables: {
          body: {
            id: idForModal!,
            status: formData.status,
          },
        },
      });
      if (response?.data?.updateMessageStatus) {
        setOpenSnackbar(true);
        setSnackbarMessage(response.data.updateMessageStatus);
        refetch();
        setOpenModal(false);
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        setOpenSnackbar(true);
        setSnackbarMessage(
          error.graphQLErrors.map((e) => e.message).join("\n"),
        );
      }
    }
  };

  if (errorMessages) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="body2">{errorMessages.message}</Typography>
      </Box>
    );
  }
  if (loadingMessages) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TicketSkeleton />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          maxHeight: "75dvh",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {messages!.length > 0 ? (
          messages!.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              setOpenModal={setOpenModal}
              role={role === "achat"}
            />
          ))
        ) : (
          <Typography variant="body2">Aucun ticket pour le moment.</Typography>
        )}
      </Box>

      <ModalForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleStatusUpdate}
        title="Modifier le statut du ticket"
        fields={[
          {
            name: "status",
            label: "Statut",
            options: messageStatuses?.getAllMessageStatuses.map(
              (status: MessageStatus) => ({
                value: status.status,
                label: status.status,
              }),
            ),
          },
        ]}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
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
