import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import "./AdminLayout.css";
import AdminCheck from "../components/AdminCheck/AdminCheck";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
const AdminLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <>
      <AdminCheck> </AdminCheck>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <div className="adminlayout">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AdminLayout;
