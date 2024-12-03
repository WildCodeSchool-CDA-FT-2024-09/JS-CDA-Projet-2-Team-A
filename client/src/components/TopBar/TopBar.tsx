import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export default function TopBar() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "100px",
          borderRadius: "5px",
          background: "#FFF",
          boxShadow: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            color: "#383E49",
            paddingLeft: "10px",
          }}
        >
          Bienvenue John DOE
        </Typography>
        <SupervisorAccountIcon
          fontSize="large"
          sx={{
            color: "#383E49",
          }}
        />
      </AppBar>
    </>
  );
}
