import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import App from "./App.tsx";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage.tsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.tsx";
import WorkshopHomePage from "./pages/WorkshopHomePage/WorkshopHomePage.tsx";
import SupplierHomePage from "./pages/SupplierHomePage/SupplierHomePage.tsx";
import PurchaseHomePage from "./pages/PurchaseHomePage/PurchaseHomePage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "achat",
        element: <PurchaseHomePage />,
        children: [
          {
            path: "inventaire",
            element: <InventoryPage />,
          },
        ],
      },
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
