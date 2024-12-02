import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import AdminPage from "./pages/AdminPage.tsx";
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
      { path: "/atelier", element: "workshop", children: [] },
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
