import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import WorkshopHomePage from "./pages/WorkshopHomePage/WorkshopHomePage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/achat", element: "buyer", children: [] },
      {
        path: "/approvisionnement",
        element: "supply",
        children: [],
      },
      { path: "/atelier", element: <WorkshopHomePage />, children: [] },
      { path: "/admin", element: <AdminHomePage />, children: [] },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
