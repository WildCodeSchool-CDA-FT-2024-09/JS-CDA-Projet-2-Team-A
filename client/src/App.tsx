// import Login from "./pages/LoginPage/Login";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import SideNavBar from "./components/SideNavbar/SideNavBar.tsx";
import TopBar from "./components/TopBar/TopBar.tsx";
import useScreenSize from "./hook/useScreenSize.ts";

export default function App() {
  const { isSmallScreen } = useScreenSize();

  const appWidth = isSmallScreen ? "87dvw" : "100dvw";

  return (
    <Box
      component="main"
      sx={{
        // background: "#F0F1F3",
        background: "red",
        height: "100dvh",
        width: appWidth,
        display: "flex",
        alignItems: "center",
      }}
    >
      <GlobalStyles
        styles={{ "*": { boxSizing: "border-box", margin: "0" } }}
      />
      {/* <Login /> */}
      <SideNavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: appWidth,
          padding: "20px 20px 20px 20px",
        }}
      >
        <TopBar />
        <Outlet />
      </Box>
    </Box>
  );
}
