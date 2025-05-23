import "./Cards.css";
import Team from "../../assets/slider/pic1.jpg";
import Custom from "../../assets/slider/pic2.avif";
import Global from "../../assets/slider/pic3.jpg";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importer le hook

export default function Cards() {
  const { i18n } = useTranslation(); // Utiliser useTranslation pour obtenir l'instance i18n
 

  const products = [
    {
      id: 1,
      titlefr: "Team Building",
      titleen: "Team Building",
      image: Team,
      navigate: "/services/team-building",
    },
    {
      id: 2,
      titlefr: "Accompagnement",
      titleen: "Global Support",
      image: Global,
      navigate: "/services/global-support",
    },
    {
      id: 3,
      titlefr: "Stands Personnalisés",
      titleen: "Custom Stands",
      image: Custom,
      navigate: "/services/custom-stands",
    },
  ];

  // Mapping des produits avec le titre en fonction de la langue courante
  const all = products.map((product) => {
    const title = i18n.language === "fr" ? product.titlefr : product.titleen;

    return (
      <div key={product.id} className="cardsmain">
        <div className="overlaycards">
          <div className="h1">{title}</div>

          <a
            href={product.navigate}
            className="cardscard"
            style={{ backgroundImage: `url(${product.image})` }}
          ></a>
        </div>
      </div>
    );
  });

  return <div className="allcardsmain">{all}</div>;
}
