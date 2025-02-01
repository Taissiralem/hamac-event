import { useTranslation } from "react-i18next";
import ContactForm from "../../components/ContactForm/ContactForm";
import Question from "../../components/Question/Question";
import "./Stands.css";

export default function Stands() {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner" style={{ marginBottom: "80px" }}>
        <h1 className="bannerHeader">STANDS SUR MESURE</h1>
      </div>
      <h1
        style={{ fontSize: "30px", marginLeft: "25px", marginBottom: "25px" }}
      >
        Titre pour la page des stands sur mesure :
      </h1>
      <div className="list">
        <img
          src="https://images.unsplash.com/photo-1549388604-817d15aa0110"
          alt=""
        />{" "}
        <img
          src="https://images.unsplash.com/photo-1574180045827-681f8a1a9622"
          alt=""
        />{" "}
        <img
          src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1481277542470-605612bd2d61"
          alt=""
        />{" "}
        <img
          src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1574180045827-681f8a1a9622"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1525097487452-6278ff080c31"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1574180045827-681f8a1a9622"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1530731141654-5993c3016c77"
          alt=""
        />{" "}
        <img
          src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62"
          alt=""
        />
      </div>
      <hr
        className="teambuildingHR"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      />

      <div className="right" id="right-stands" style={{ marginBottom: "50px" }}>
        <h2>{t("title-tb")}</h2>
        <p>{t("description-tb")}</p>
        <ContactForm motif={"Landing page"} />
      </div>
    </>
  );
}
