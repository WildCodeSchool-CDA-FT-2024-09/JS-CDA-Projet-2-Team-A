import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useUser } from "../../contexts/UserContext";

export default function TopBar() {
  const { user } = useUser();

  const teamIcon = (role: string) => {
    switch (role) {
      case "1": // Achat
        return <ShoppingCartIcon fontSize="large" sx={{ color: "#383E49" }} />;
      case "2": // Appro
        return <AssignmentIcon fontSize="large" sx={{ color: "#383E49" }} />;
      case "3": // Atelier
        return (
          <PrecisionManufacturingIcon
            fontSize="large"
            sx={{ color: "#383E49" }}
          />
        );
      case "4": // Admin
        return (
          <SupervisorAccountIcon fontSize="large" sx={{ color: "#383E49" }} />
        );
    }
  };
  console.info(
    "Coucou les hackers, je sais pas si ça va vous servir à grand chose, mais vous avez accès à une liste d'icone :",
    teamIcon,
  );

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
          Bienvenue {user.name}
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
