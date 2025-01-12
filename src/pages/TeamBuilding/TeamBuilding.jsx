import "./TeamBuilding.css";
import Sorties from "../../components/Sortie/Sorties";
import ContactForm from "../../components/ContactForm/ContactForm";

export default function TeamBuilding() {
  return (
    <section id="Team-building">
      <div className="banner">
        <h1 className="bannerHeader">Team Building</h1>
      </div>
      {/* hna ajout de blabla and img team building */}
      <div className="sorties">
        <h1>Sorties Proposées :</h1>
        <Sorties></Sorties>
      </div>
      {/* <div className="reserve-button-wrapper">
        <button className="reserve-button">JE RÉSERVE</button>
      </div> */}
      <hr  className="teambuildingHR"/>
      <div className="right rightTB">
        <h2>Réserver votre Sortie dès maintenant!</h2>
        <p>Envoyez nous vos cordonnées pour que nous puissions arranger votre sortie</p>
        <ContactForm />
      </div>
    </section>
  );
}
