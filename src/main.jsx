import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from 'react-toastify';
import './styles/index.css'
import routes from "./routes.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer/>
    <RouterProvider router={router} />
  </StrictMode>
);
