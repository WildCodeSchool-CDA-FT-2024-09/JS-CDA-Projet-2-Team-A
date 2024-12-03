import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import InventroyPage from "./pages/InventoryPage/InventoryPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "achat", element: <InventroyPage />, children: [] },
      {
        path: "approvisionnement",
        element: "supply",
        children: [
          {
            path: "inventaire",
            element: <InventroyPage />,
          },
        ],
      },
      {
        path: "atelier",
        element: <InventroyPage />,
        children: [],
      },
      { path: "admin", element: <AdminHomePage />, children: [] },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
