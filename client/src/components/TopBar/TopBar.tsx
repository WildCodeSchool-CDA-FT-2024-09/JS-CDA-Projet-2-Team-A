import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { useUser } from "../../contexts/UserContext";

export default function TopBar() {
  const { user } = useUser();

  const teamIcon = (role: string) => {
    switch (role) {
      case "1": // Achat
        return (
          <HandshakeOutlinedIcon fontSize="large" sx={{ color: "#383E49" }} />
        );
      case "2": // Appro
        return (
          <LocalShippingOutlinedIcon
            fontSize="large"
            sx={{ color: "#383E49" }}
          />
        );
      case "3": // Atelier
        return (
          <ConstructionOutlinedIcon
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

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "10dvh",
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
        {teamIcon(user.role)}
      </AppBar>
    </>
  );
}
