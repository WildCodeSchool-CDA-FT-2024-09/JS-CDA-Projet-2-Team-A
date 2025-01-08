import { ReactElement } from "react";
import { Box, Skeleton, Grid2 as Grid } from "@mui/material";

export default function TicketSkeleton(): ReactElement {
  return (
    <Grid
      container
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Colonne principale */}
      <Box sx={{ flex: "0 1 75%", display: "flex", flexDirection: "column" }}>
        <Skeleton
          variant="text"
          width="10rem"
          height="2rem"
          sx={{ marginBottom: "0.5rem" }}
        />
        <Skeleton variant="text" width="100%" height="2rem" />
      </Box>
      {/* Colonne droite */}
      <Box
        sx={{
          flex: "0 1 25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="6rem"
          height="1.5rem"
          sx={{ marginBottom: "auto" }}
        />
        <Skeleton
          variant="text"
          width="4rem"
          height="1rem"
          sx={{ marginTop: "auto" }}
        />
      </Box>
    </Grid>
  );
}
