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
import TicketsPage from "./pages/TicketsPage/TicketsPage.tsx";
import SuppliersPage from "./pages/SuppliersPage/SuppliersPage.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import "./index.css";
import OrderPage from "./pages/OrderPage/OrderPage.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";

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
          {
            path: "tickets",
            element: <TicketsPage />,
          },
          {
            path: "fournisseurs",
            element: <SuppliersPage />,
          },
          {
            path: "produit",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "approvisionnement",
        element: <SupplierHomePage />,
        children: [
          {
            path: "",
            element: <OrderPage />,
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
          {
            path: "tickets",
            element: <TicketsPage />,
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
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </UserProvider>
    </ApolloProvider>
  </StrictMode>,
);
