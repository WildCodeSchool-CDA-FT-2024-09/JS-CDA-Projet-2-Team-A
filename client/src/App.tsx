// import Login from "./pages/LoginPage/Login";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "@mui/material";

export default function App() {
  return (
    <>
      <GlobalStyles
        styles={{ "*": { boxSizing: "border-box", margin: "0" } }}
      />
      {/* <Login /> */}
      <Outlet />{" "}
      {/* Temporaire pour pouvoir afficher visuellement la navbar sans
      se logger */}
    </>
  );
}
