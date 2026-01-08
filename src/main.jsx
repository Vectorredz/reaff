import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import './styles/index.css'
import routes from "./routes.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      limit={1}
      autoClose={1500}
      stacked={false}
    />
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
