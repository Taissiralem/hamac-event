import { useEffect } from "react";
import "./Sorties-add.css";
import { Helmet } from "react-helmet";
import Sortiess from "../../../components/Sortie/Sorties";
import { useNavigate } from "react-router-dom";

export default function Sorties() {
  const Navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Team building</title>
      </Helmet>

      <div className="sorties-add-container">
        <h1 style={{ padding: "25px 0 0 20px ", margin: "0" }}>
          Gérer vos sorties
        </h1>
        <Sortiess></Sortiess>
        <button className="add-btn" onClick={() => Navigate("add-form")}>
          Ajouter une sortie
        </button>
      </div>
    </>
  );
}
