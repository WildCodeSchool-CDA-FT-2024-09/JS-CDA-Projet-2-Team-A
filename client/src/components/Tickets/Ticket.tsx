import { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";

export default function Ticket({
  data,
  role,
}: {
  data: { id: number; title: string; message: string; status: string };
  role: boolean;
}): ReactElement {
  const capitalize = (str: string): string =>
    str ? str[0].toUpperCase() + str.slice(1) : "";
  return (
    <Grid
      container
      spacing={2}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Grid
        size={{ xs: 9 }}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: "500", textOverflow: "ellipsis" }}
        >
          {capitalize(data.title)}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: 1, textOverflow: "ellipsis" }}
        >
          {capitalize(data.message)}
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 3 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {role && (
          <Button
            variant="outlined"
            sx={{
              height: "fit-content",
              width: "fit-content",
              textTransform: "none",
              fontSize: "0.7em",
              lineHeight: "1",
            }}
          >
            Modifier le statut
          </Button>
        )}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: "auto",
            color: "gray",
          }}
        >
          {data.status}
        </Typography>
      </Grid>
    </Grid>
  );
}
