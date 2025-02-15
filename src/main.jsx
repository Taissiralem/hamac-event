import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n.js";
import Login from "./pages/Admin/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminHome from "./pages/Admin/Home/Home.jsx";
import TeamBuilding from "./pages/TeamBuilding/TeamBuilding.jsx";
import Accompagnement from "./pages/Accompagnement/Accompagnement.jsx";
import Stands from "./pages/Stands/Stands.jsx";
import SortiesAdmin from "./pages/Admin/Sorties-add/Sorties-add.jsx";
import SortiesAddForm from "./pages/Admin/Sorties-add-form/Sorties-add-form.jsx";
import Contact from "./pages/Admin/Contact/Contact.jsx";
import Newsletter from "./pages/Admin/Newsletter/Newsletter.jsx";
import EditSortie from "./pages/Admin/EditSortie/EditSortie.jsx";
// n

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "services/team-building",
        element: <TeamBuilding />,
      },
      {
        path: "services/global-support",
        element: <Accompagnement />,
      },
      {
        path: "services/custom-stands",
        element: <Stands />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "home", element: <AdminHome /> },
      {
        path: "tb-sorties",
        element: <SortiesAdmin />,
      },
      {
        path: "tb-sorties/add-form",
        element: <SortiesAddForm />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
      {
        path: "tb-sorties/edit-sortie/:Sortieid",
        element: <EditSortie />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/auth/signin",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
