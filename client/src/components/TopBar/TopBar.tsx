import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

export default function TopBar() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          borderRadius: "5px",
          background: "#FFF",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#383E49",
          }}
        >
          Bienvenue John DOE
        </Typography>
      </AppBar>
    </>
  );
}
