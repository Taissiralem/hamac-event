import "./Sorties.css"; // Optional CSS for styling
import Card from "../../assets/Rectangle1.webp";
import { getSorties } from "../../services/addSortieServices";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseSortie } from "../../redux/slices/chosenSortieSlice";

const CardComponent = ({ href }) => {
  const [sorties, setSorties] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getSorties().then((data) => {
      setSorties(data.data.sorties);
    });
  }, []);

  const userRole = useSelector((state) => state.auth?.user?.role);
  console.log(userRole);
  const admin = userRole === "admin";

  const handleCardClick = (id) => {
    dispatch(chooseSortie(id));
  };

  return (
    <div className="cards-container">
      {sorties.map((card, index) => (
        <div
          className="card"
          key={index}
          onClick={() => handleCardClick(card.titleFr)}
        >
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
