import { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import Ticket from "./Ticket.tsx";
import TicketSkeleton from "./TicketSkeleton.tsx";
import {
  Message,
  useGetAllMessagesQuery,
} from "../../generated/graphql-types.ts";

export default function TicketsList(): ReactElement {
  const { data, loading, error } = useGetAllMessagesQuery();

  if (error) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="body2">{error.message}</Typography>
      </Box>
    );
  }
  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TicketSkeleton />
      </Box>
    );
  }

  return (
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
      {data!.getAllMessages.length > 0 ? (
        data!.getAllMessages.map(
          (
            ticket: Pick<
              Message,
              "id" | "title" | "message" | "message_status"
            >,
          ) => (
            <Ticket
              key={ticket.id}
              data={{
                title: ticket.title,
                message: ticket.message,
                message_status: ticket.message_status,
              }}
            />
          ),
        )
      ) : (
        <Typography variant="body2">Aucun tickets pour le moment.</Typography>
      )}
    </Box>
  );
}
