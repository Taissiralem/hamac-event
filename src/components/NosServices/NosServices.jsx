import Cards from "../Cards/Cards";
import "./NosServices.css";

export default function NosServices() {
  return (
    <section id="services">
      <div className="servicesheader">
        <h1>Nos Services</h1>
        <h2>Des solutions pour chaque étape de vos projets</h2>
      </div>
      <Cards></Cards>
    </section>
  );
}
