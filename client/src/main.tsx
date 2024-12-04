import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import WorkshopHomePage from "./pages/WorkshopHomePage/WorkshopHomePage.tsx";

import "./index.css";
import SupplierHomePage from "./pages/SupplierHomePage/SupplierHomePage.tsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "achat", element: <InventoryPage />, children: [] },
      {
        path: "approvisionnement",
        element: <SupplierHomePage />,
        children: [
          {
            path: "inventaire",
            element: <InventoryPage />,
          },
        ],
      },
      {
        path: "atelier",
        element: <InventoryPage />,
        children: [],
      },
      { path: "atelier", element: <WorkshopHomePage />, children: [] },
      { path: "admin", element: <AdminHomePage />, children: [] },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
);
