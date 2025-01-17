import "./Sorties.css"; // Optional CSS for styling
import Card from "../../assets/Rectangle1.webp";
import { getSorties } from "../../services/addSortieServices";
import { useEffect } from "react";
import { useState } from "react";

const CardComponent = ({ href }) => {
  const [sorties, setSorties] = useState([]);
  useEffect(() => {
    getSorties().then((data) => {
      setSorties(data.data.sorties);
      console.log(data.data);
    });
  }, []);

  return (
    <div className="cards-container">
      {sorties.map((card, index) => (
        <div className="card" key={index}>
          <a className="cards-unset" href={href}>
            <div className="card-image-wrapper">
              <img
                src={card.images[0]}
                alt={card.titleFr}
                className="card-image"
              />
              <span className="card-badge">{card.localisation}</span>
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.titleFr}</h3>
              <p className="card-date">{card.days}</p>
              <p className="card-description">{card.descFr}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
