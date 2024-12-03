import Login from "./pages/LoginPage/Login";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Login />
      <Outlet /> // Temporaire pour pouvoir afficher visuellement la navbar sans
      se logger
    </>
  );
}
