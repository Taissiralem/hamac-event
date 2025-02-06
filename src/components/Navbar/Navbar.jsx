import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
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
  const isauth = useSelector((state) => state.auth?.isLoggedIn);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const language = i18n.language;
  const languageMenuRef = useRef(null);
  const sidebarMenuRef = useRef(null);

  const handleNavigationToSection = (sectionId) => {
    navigate("/"); // Navigate to the landing page
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure the page is fully loaded
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setIsLanguage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarMenuRef.current &&
        !sidebarMenuRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarfirst">
        <Link to="/">
          <img
            src={logo1}
            alt="Logo"
            className="main-logo"
            onClick={() => navigate("/")}
          />
        </Link>
      </div>

      <div className="navbarmiddle">
        <NavLink to={"/"} onClick={() => window.scrollTo(0, 0)}>
          {t("homeNav")}
        </NavLink>
        <a
          href="#aboutus"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection("#about-section");
          }}
        >
          {t("about-usNav")}
        </a>
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection("#services");
          }}
        >
          Services
        </a>
        <a
          href="contact-page"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection(".contact-page");
          }}
        >
          {t("contact-usNav")}
        </a>

        {isauth && <NavLink to={"/admin/home"}>Dashboard</NavLink>}
      </div>

      <div
        className="language"
        onClick={() => setIsLanguage(!isLanguage)}
        ref={languageMenuRef}
      >
        <span>{language}</span>
        <img
          src={language === "en" ? en : fr}
          alt="Flag"
          width={24}
          height={24}
        />
      </div>

      <div
        ref={languageMenuRef}
        className={
          isLanguage
            ? "language-menu active-language webactive"
            : "language-menu"
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

      <div
        className={`mobile-sidebar ${isSidebarOpen ? "active" : ""}`}
        ref={sidebarMenuRef}
      >
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          ✖
        </button>
        <NavLink
          to={"/"}
          onClick={() => {
            setIsSidebarOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          {t("homeNav")}
        </NavLink>
        <a
          href="#aboutus"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection("#about-section");
            setIsSidebarOpen(false);
          }}
        >
          {t("about-usNav")}
        </a>
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection("#services");
            setIsSidebarOpen(false);
          }}
        >
          Services
        </a>
        <a
          href="contact-page"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleNavigationToSection(".contact-page");
            setIsSidebarOpen(false);
          }}
        >
          {t("contact-usNav")}
        </a>

        {/* Language Selector inside Sidebar */}
        <div className="language-mobile-container">
          <div
            className="language-mobile"
            onClick={() => setIsLanguage(!isLanguage)}
            ref={languageMenuRef}
          >
            Language :<span>{language}</span>
            <img
              src={language === "en" ? en : fr}
              alt="Flag"
              width={24}
              height={24}
            />
          </div>
          <div
            ref={languageMenuRef}
            className={
              isLanguage
                ? "language-menu active-language mobileview "
                : "language-menu mobileview"
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
      </div>

      <div className="menu-bar">
        <div
          className="menu-icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RiMenu3Fill color="white" size={46} />
        </div>
      </div>
    </nav>
  );
}
