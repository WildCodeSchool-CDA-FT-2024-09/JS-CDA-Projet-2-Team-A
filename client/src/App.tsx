import Login from "./pages/LoginPage/Login";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <>
      <Login />
      <Box
        sx={{
          marginLeft: "13dvw",
          padding: "10px",
        }}
      >
        <Outlet />
        {/*Temporaire pour pouvoir afficher visuellement la navbar sans se logger*/}
      </Box>
    </>
  );
}
