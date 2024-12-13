import { ReactElement } from "react";
import { Box, Typography, Button } from "@mui/material";
import TicketsList from "../../components/Tickets/TicketsList.tsx";
import { useUser } from "../../contexts/UserContext.tsx";

export default function TicketsPage(): ReactElement {
  const {
    user: { role },
  } = useUser();
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
        <Button
          variant="contained"
          sx={{
            height: "40px",
            textTransform: "none",
          }}
        >
          {role === "achat" ? "Modifier ticket" : "Nouveau ticket"}
        </Button>
      </Box>
      <TicketsList />
    </Box>
  );
}
