import "./TeamBuilding.css";
import Sorties from "../../components/Sortie/Sorties";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";
import City from "../../assets/Rectangle1.webp";
import { useSelector } from "react-redux";

export default function TeamBuilding() {
  const clickedSortie = useSelector((state) => state.chosenSortie.id);

  const { t } = useTranslation();
  return (
    <section id="Team-building">
      <div className="banner">
        <h1 className="bannerHeader">Team Building</h1>
      </div>
      <div className="blablaTb">
        <div className="forabout forblabla">
          <div className="forimgabout">
            <img src={City} alt="Img" />
          </div>
          <div className="fortextabout">
            <h1 style={{ fontSize: "32px" }}>{t("titleTb")}</h1>
            <p>{t("description1Tb")}</p>
            <p>{t("description2Tb")}</p>
          </div>
        </div>
      </div>
      <div className="sorties">
        <h1> {t("sortiesPropose")} </h1>

        <Sorties href={"#contact-tb"}></Sorties>
      </div>

      <hr className="teambuildingHR" id="contact-tb" />
      <div className="right rightTB">
        <h2>Réserver votre Sortie dès maintenant!</h2>
        <p>
          Envoyez nous vos cordonnées pour que nous puissions arranger votre
          sortie
        </p>
        <ContactForm motif={`Team Building / ${clickedSortie}`} />
      </div>
    </section>
  );
}
