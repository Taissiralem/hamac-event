import { IoHome } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { LuNewspaper } from "react-icons/lu";
import { IoMdStats } from "react-icons/io";
import Logo from "../../assets/logo/logo1.png";
import { SlLogout } from "react-icons/sl";
import { useDispatch } from "react-redux"; // Import useDispatch
import { logout } from "../../redux/slices/authSlice"; // Import logout action

const SideBar = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  const infos = [
    { icon: <IoHome />, text: "Home", link: "/admin/home" },
    { icon: <IoMdStats />, text: "Stat", link: "/admin/stat" },
    { icon: <LuNewspaper />, text: "Newsletter", link: "newsletter" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/signin");
  };

  return (
    <>
      <div className="forsidebar"></div>
      <div className="sidebar">
        <img
          src={Logo}
          alt="Logo"
          className="admin-logo"
          onClick={() => navigate("/")}
        />
        <ul className="sidebar-items">
          {infos.map((info, index) => (
            <li key={index} className="sidebar-item">
              <NavLink to={info.link}>
                <div className="side-bar-content">
                  <span className="sidebar-icons">{info.icon}</span>{" "}
                  <span className="sidebar-texts">{info.text}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <SlLogout
          className="logout"
          color="white"
          size={25}
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

export default SideBar;
