import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CiGlobe, CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Popover from "../Popover/Menu";
import logo1 from "../../assets/logo/logo1.png";

import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { RiMenu3Fill } from "react-icons/ri";
import fr from "../../assets/fr.jpg";
import en from "../../assets/en.png";
import i18n from "../../i18n/i18n";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const language = i18n.language;
  console.log(language);

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
          <NavLink to={"/about"}>{t("about-usNav")}</NavLink>
          <NavLink to={"/products"}>{t("productsNav")}</NavLink>
          <NavLink to={"/contact"}>{t("contact-usNav")}</NavLink>
        </div>
        {/* <div className="navbarlast">
          <Popover
            icon={<CiGlobe size={25} className="globe" />}
            title1={"francais"}
            title2={"english"}
            rightslot={"🇫🇷"}
            rightslot2={"🇺🇸"}
            userClicked={() => changeLanguage("fr")}
            userClicked2={() => changeLanguage("en")}
          />

          <button
            onClick={() => {
              navigate("/auth/signin");
            }}
          >
            {t("btnNav")}
          </button>
        </div> */}
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
