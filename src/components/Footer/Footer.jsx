"use client";
import "./Footer.css";
import { FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
// import { createNewsletter } from "@/app/services/newsletter";
import logo1 from "../../assets/logo/logo1.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  // const localActive = useLocale();

  // State to toggle email input visibility
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const formRef = useRef(null);

  const handleNewsletterClick = () => {
    setShowEmailInput(true); // Toggle the visibility
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // createNewsletter({ email });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Email has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    setEmail("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowEmailInput(false);
      }
    };

    if (showEmailInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmailInput]);

  return (
    <footer className="footer">
      <div className="top-footer">
        <div className="left-footer">
          <div className="logo">
            <img src={logo1} alt="white-logo" />
          </div>
          <p>{t("footer.top-footer.description")}</p>

          <button
            id="newsletter-button"
            // className={`${outfit.className}`}
            onClick={handleNewsletterClick}
            style={{
              display: showEmailInput ? "none" : "block",
              opacity: showEmailInput ? 0 : 1,
              transition: "all 0.4s ease-in-out",
            }}
          >
            {t("footer.top-footer.button")}
          </button>

          <form
            onSubmit={handleEmailSubmit}
            ref={formRef}
            className="newsletter-form"
            style={{
              transition: "all 0.4s ease-in-out",
              opacity: showEmailInput ? 1 : 0,
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email-input"
              style={{
                width: showEmailInput ? "22vw" : "10%",
                transition: "all 0.5s ease-in-out",
                display: showEmailInput ? "block" : "none",
              }}
            />
            <button
              type="submit"
              id="submit-button"
              className="submit-button"
              style={{
                left: showEmailInput ? "16vw" : "0",
                transition: "all 0.5s ease-in-out",
                cursor: "pointer",
                right: "16vw",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="right-footer">
          <ul>
            <li className="title-liste">
              {t("footer.top-footer.links.explore")}
            </li>
            <Link href="/#hero-section">
              <li>{t("home")}</li>
            </Link>
            <Link href="/#about-section">
              <li>{t("about")}</li>
            </Link>
            <Link href={`/Product`}>
              <li>{t("products")}</li>
            </Link>
            <Link href={`/Contact`}>
              <li>{t("contact")}</li>
            </Link>
          </ul>
          <ul>
            <li className="title-liste">
              {t("footer.top-footer.links.useful-links.title")}
            </li>
            <li>{t("footer.top-footer.links.useful-links.Give-feedback")}</li>
            <li>{t("footer.top-footer.links.useful-links.Support")}</li>
          </ul>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="social">
          <a href="https://www.instagram.com/hamac.events/" target="_blank">
            <FiInstagram color="white" size={32} />
          </a>
          <a
            href="https://www.linkedin.com/company/hamac-alg%C3%A9rie/"
            target="_blank"
          >
            <FiLinkedin color="white" size={32} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100075646883318"
            target="_blank"
          >
            <FiFacebook color="white" size={32} />
          </a>
        </div>
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
