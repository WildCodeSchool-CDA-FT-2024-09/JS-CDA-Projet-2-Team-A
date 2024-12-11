import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./contexts/UserContext.tsx";
import { client } from "./services/apolloClient.ts";
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
            path: "",
            element: <InventoryPage />,
          },
        ],
      },
      {
        path: "approvisionnement",
        element: <SupplierHomePage />,
        children: [
          {
            path: "",
            element: <InventoryPage />,
          },
        ],
      },
      {
        path: "atelier",
        element: <WorkshopHomePage />,
        children: [
          {
            path: "",
            element: <InventoryPage />,
            children: [],
          },
        ],
      },

      { path: "admin", element: <AdminHomePage />, children: [] },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ApolloProvider>
  </StrictMode>,
);
