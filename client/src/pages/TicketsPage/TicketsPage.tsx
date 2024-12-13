import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TicketsList from "../../components/Tickets/TicketsList.tsx";

export default function TicketsPage(): ReactElement {
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
          Retours atelier
        </Typography>
        <Button
          variant="contained"
          sx={{
            height: "40px",
            textTransform: "none",
          }}
        >
          Nouveau ticket
        </Button>
      </Box>
      <TicketsList />
    </Box>
  );
}
