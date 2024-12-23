import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import logo1 from "../../assets/logo/logo1.png";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { RiMenu3Fill } from "react-icons/ri";
import fr from "../../assets/fr.jpg";
import en from "../../assets/en.png";
import i18n from "../../i18n/i18n";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isauth = useSelector((state) => state.auth?.isLoggedIn);

  const [isLanguage, setIsLanguage] = useState(false);
  const language = i18n.language;
  console.log(useSelector((state) => state.auth));

  return (
    <>
      <nav className="navbar">
        <div className="navbarfirst">
          <Link to={"/"}>
            <img
              src={logo1}
              alt="Logo"
              className="main-logo"
              onClick={() => navigate("/")}
            />
          </Link>
        </div>

        <div className="navbarmiddle">
          <NavLink to={"/"}>{t("homeNav")}</NavLink>
          <a href="#aboutus">{t("about-usNav")}</a>
          <a href="#services">Services</a>
          <NavLink to={"/contact"}>{t("contact-usNav")}</NavLink>

          {isauth && <NavLink to={"/admin/home"}>Dashboard</NavLink>}
        </div>

        <div className="language">
          <div
            className="language"
            onClick={() => {
              setIsLanguage(!isLanguage);
            }}
            style={{ cursor: "pointer" }}
          >
            <span>{language}</span>
            <img
              src={language === "en" ? en : fr}
              alt="Flag"
              width={24}
              height={24}
            />
          </div>
          <div className="menu" onClick={() => setIsOpen(!isOpen)}>
            <RiMenu3Fill color="white" size={23} />
          </div>
          <div
            className={
              isLanguage ? "language-menu active-language" : "language-menu"
            }
          >
            <ul>
              <li
                onClick={() => {
                  changeLanguage("en");
                  setIsLanguage(false);
                }}
              >
                <img src={en} alt="English Flag" width={24} height={24} />
                <span> English</span>
              </li>
              <li
                onClick={() => {
                  changeLanguage("fr");
                  setIsLanguage(false);
                }}
              >
                <img src={fr} alt="French Flag" width={24} height={24} />
                <span> français</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
