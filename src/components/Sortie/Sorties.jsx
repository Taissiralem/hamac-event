import { useState, useEffect } from "react";
import { deleteSortie, getSorties } from "../../services/addSortieServices";
import { useSelector, useDispatch } from "react-redux";
import { chooseSortie } from "../../redux/slices/chosenSortieSlice";
import "./Sorties.css";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const CardComponent = ({ href }) => {
  const navigate = useNavigate();
  const [sorties, setSorties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette sortie ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSortie(id);
        Swal.fire(
          "Suppression réussie !",
          "La sortie a été supprimée.",
          "success"
        );
        window.location.reload();
      }
    });
  };

  const userRole = useSelector((state) => state.auth?.user?.role);
  const admin = userRole === "admin";
  console.log(admin);

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
                  {admin && (
                    <>
                      <span
                        className="edit-badge card-badge"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`edit-sortie/${card._id}`);
                        }}
                      >
                        <FaRegEdit />
                      </span>
                      <span
                        className="edit-badge card-badge delete-badge"
                        onClick={(e) => {
                          HandleDelete(card._id);
                          e.preventDefault();
                        }}
                      >
                        <MdDeleteForever size={20} />
                      </span>
                    </>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.titleFr}</h3>
                  <h2 className="card-date">{card.days}</h2>

                  {/* Description Section */}
                  <p
                    className={`card-description ${
                      isExpanded ? "expanded" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(index);
                    }}
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
