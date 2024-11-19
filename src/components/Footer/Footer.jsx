/* eslint-disable react/no-unescaped-entities */
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { BsInstagram } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Component() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footercontainer">
        <div className="footerfirstsection">
          <img src="" alt="maxshine logo" className="iconfooter" />

          <h3 style={{ fontSize: "16.5px", width: "70%", margin: "0" }}>
            {t("aboutus_title")}
          </h3>
        </div>
        <div className="footeraboutsection">
          <h3 className="">{t("AboutSym")}</h3>
          <ul className="">
            <li>
              <Link
                to="/about"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <ChevronRightIcon className="" />
                {t("Our Company")}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <ChevronRightIcon className="" />
                {t("productsNav")}
              </Link>
            </li>

            <li>
              <ChevronRightIcon className="" />
              {t("Download Catalog")}
            </li>
          </ul>
        </div>

        <div className="footercontactsection">
          <h3 className="">{t("ContactUs")}</h3>
          <ul className="">
            <li>+213 550 50 50 50</li>
            <li>Email@gmail.com</li>
            <li>
              <a
                href="https://web.facebook.com/profile.php?id=61558883573403"
                target="_blank"
              >
                <FaSquareFacebook />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/symindustrie/" target="_blank">
                <BsInstagram /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/symindustrie/posts/?feedView=all"
                target="_blank"
              >
                <FaLinkedin /> Linkedin
              </a>
            </li>
            <li>
              <a
                href="
                https://www.tiktok.com/@sym_industrie"
                target="_blank"
              >
                <AiFillTikTok size={17} /> TikTok
              </a>
            </li>
          </ul>
        </div>
        <div className="forIframe">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25562.13920741331!2d2.9083640783265654!3d36.78813864996998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fbb154ab32cf7%3A0x44235dd8e0af0ec2!2sHamac%20Events!5e0!3m2!1sfr!2sdz!4v1731956571336!5m2!1sfr!2sdz"
            width="400"
            height="400"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="foriframeunder"></div>
      </div>
      <div className="footercopyright">
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
