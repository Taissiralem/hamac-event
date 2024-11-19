import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.js";

// const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
);
