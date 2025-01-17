import "./Sorties.css"; // Optional CSS for styling
import Card from "../../assets/Rectangle1.webp";

const CardComponent = ({ href }) => {
  const cards = [
    {
      image: Card, // Replace with the actual image URL
      badge: "PC Amirouche Pont 9m",
      title:
        "RANDONNÉE EN FORET DE M’HAGGA vers PONT DES 9 mètres (Circuit FACILE)",
      date: "Vendredi",
      description: "RANDONNÉE EN FORET DE M’HAGGA vers PONT DES 9 mètres...",
    },
    {
      image: Card, // Replace with the actual image URL
      badge: "Oued Bellat Chréa",
      title: "RANDONNÉE OUED BELLAT CHREA",
      date: "Vendredi",
      description: "RANDONNÉE Oued Er’ha L’atlas Blidéen Vendredi 06...",
    },
    {
      image: Card, // Replace with the actual image URL
      badge: "Exclusif",
      title: " DE LA NEIGE CE SAMEDI VERS LES TÉLÉSIEGES DE TIKIJDA",
      date: "Samedi",
      description: "SORTIE SPÉCIALE NEIGE VERS LES TÉLÉSIEGES DE TIKIJDA...",
    },
    {
      image: Card, // Replace with the actual image URL
      badge: "Exclusif",
      title: " DE LA NEIGE CE SAMEDI VERS LES TÉLÉSIEGES DE TIKIJDA",
      date: "Samedi",
      description: "SORTIE SPÉCIALE NEIGE VERS LES TÉLÉSIEGES DE TIKIJDA...",
    },
    {
      image: Card, // Replace with the actual image URL
      badge: "Exclusif",
      title: " DE LA NEIGE CE SAMEDI VERS LES TÉLÉSIEGES DE TIKIJDA",
      date: "Samedi",
      description: "SORTIE SPÉCIALE NEIGE VERS LES TÉLÉSIEGES DE TIKIJDA...",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <a className="cards-unset" href={href}>
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.title} className="card-image" />
              <span className="card-badge">{card.badge}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-date">{card.date}</p>
              <p className="card-description">{card.description}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
