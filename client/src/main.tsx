import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
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
      { path: "/admin", element: "admin", children: [] },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
