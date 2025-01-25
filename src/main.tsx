import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <div>
    <RouterProvider router={router} />
    <ToastContainer />
  </div>
);

