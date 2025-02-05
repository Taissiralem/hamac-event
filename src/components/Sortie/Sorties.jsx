import { useState, useEffect } from "react";
import { getSorties } from "../../services/addSortieServices";
import { useSelector, useDispatch } from "react-redux";
import { chooseSortie } from "../../redux/slices/chosenSortieSlice";
import "./Sorties.css";

const CardComponent = ({ href }) => {
  const [sorties, setSorties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth?.user?.role);
  const admin = userRole === "admin";

  const handleCardClick = (id) => {
    dispatch(chooseSortie(id));
  };

  useEffect(() => {
    setIsLoading(true);
    getSorties()
      .then((data) => {
        setSorties(data.data.sorties);
      })
      .catch((error) => {
        console.error("Error fetching sorties:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="cards-container">
      {isLoading ? (
        <p>Chargement des sorties proposées...</p>
      ) : sorties.length === 0 ? (
        <p>
          Aucune sortie proposée pour le moment, veuillez contacter
          l'administrateur
        </p>
      ) : (
        sorties.map((card, index) => {
          const isExpanded = expanded[index];
          const shortDesc =
            card.descFr.length > 120
              ? card.descFr.slice(0, 120) + "..."
              : card.descFr;

          return (
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
                    loading="lazy"
                  />
                  <span className="card-badge">{card.localisation}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.titleFr}</h3>
                  <h2 className="card-date">{card.days}</h2>

                  {/* Description Section */}
                  <p
                    className={`card-description ${
                      isExpanded ? "expanded" : ""
                    }`}
                  >
                    {isExpanded ? card.descFr : shortDesc}
                  </p>

                  {/* See More Button */}
                  {card.descFr.length > 120 && (
                    <button
                      className="see-more-btn"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents navigation
                        toggleExpand(index);
                      }}
                    >
                      {isExpanded ? "Voir moins" : "Voir plus"}
                    </button>
                  )}
                </div>
              </a>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardComponent;
