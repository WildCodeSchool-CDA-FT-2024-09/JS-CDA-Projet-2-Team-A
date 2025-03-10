import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./contexts/UserContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
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
import OrderPage from "./pages/OrderPage/OrderPage.tsx";
import NotFound from "./pages/NotFound.tsx";
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
          {
            path: "commandes",
            element: <OrderPage />,
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
            path: "produit/:id",
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
          {
            path: "inventaire",
            element: <InventoryPage />,
          },
          {
            path: "produit/:id",
            element: <ProductPage />,
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
          },
          {
            path: "produit/:id",
            element: <ProductPage />,
          },
          {
            path: "tickets",
            element: <TicketsPage />,
          },
        ],
      },

      { path: "admin", element: <AdminHomePage /> },
      {
        path: "*",
        element: <NotFound />,
      },
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
