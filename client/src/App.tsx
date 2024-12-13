import Login from "./pages/LoginPage/Login";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import SideNavBar from "./components/SideNavbar/SideNavBar.tsx";
import TopBar from "./components/TopBar/TopBar.tsx";
import { useUser } from "./contexts/UserContext.tsx";

export default function App() {
  const { user } = useUser();
  if (!user.name) {
    return <Login />;
  }
  return (
    <Box
      component="main"
      sx={{
        background: "#F0F1F3",
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <GlobalStyles
        styles={{ "*": { boxSizing: "border-box", margin: "0" } }}
      />
      <Login />
      <SideNavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100dvw",
          padding: "20px 20px 20px 20px",
        }}
      >
        <TopBar />
        <Outlet />
      </Box>
    </Box>
  );
}
