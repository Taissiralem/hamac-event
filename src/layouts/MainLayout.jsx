import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";

export default function MainLayout() {
  return (
    <>
      <Helmet>
        <title>Hamac Events</title>
      </Helmet>
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
