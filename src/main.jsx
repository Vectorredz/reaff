import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { DatabaseContextProvider } from "./contexts/DatabaseContext.jsx";
import { UtilitiesContextProvider } from "./contexts/UtilitiesContext.jsx";
import "./styles/index.css";
import routes from "./routes.jsx";
import { FormContextProvider } from "./contexts/FormContext.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      limit={1}
      autoClose={1500}
      stacked={false}
    />
    <UtilitiesContextProvider>
      <AuthContextProvider>
        <DatabaseContextProvider>
          <FormContextProvider formTemplate={null}>
            <RouterProvider router={router} />
          </FormContextProvider>
        </DatabaseContextProvider>
      </AuthContextProvider>
    </UtilitiesContextProvider>
  </StrictMode>,
);
