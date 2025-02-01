import "./InfoBoard.css";

const InfoBoard = () => {
  return (
    <div className="board">
      {/* <div className="title-board">
        <h2>Nos services d’accompagnement pour les entreprises</h2>
      </div> */}
      <div className="grid-board">
        <div className="borad-box">
          <hr />
          <span>
            <h2>Conception 2D et 3D pour la communication visuelle</h2>
          </span>
          <p>
            Création de chartes graphiques : Élaboration de visuels cohérents
            avec l'identité de votre marque pour vos supports de communication
            (brochures, affiches, flyers). <br />
            Conception de stands personnalisés : Création de stands à la fois
            esthétiques et fonctionnels, avec un design sur-mesure qui reflète
            l’ADN de votre entreprise. <br />
            Maquettes 3D : Pour vous permettre de visualiser l'aménagement de
            votre espace avant l'événement, en prenant en compte chaque détail
            visuel.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Gestion complète des salons et foires professionnels</h2>
          </span>
          <p>
            Accompagnement personnalisé durant l’événement : Nous nous chargeons
            de la logistique de votre participation, y compris la gestion des
            inscriptions, l’accueil des visiteurs, et l'animation de votre
            stand. <br />
            Réservation d’espace : Nous prenons en charge les démarches
            administratives pour réserver votre stand et vous assurer d’être
            situé dans le meilleur emplacement. <br />
            Assistance en temps réel : Gestion des imprévus et assistance à
            chaque étape pour garantir la fluidité et la réussite de votre
            présence sur le salon.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Services de transport</h2>
          </span>
          <p>
            Gestion du transport de matériel : Organisation du transport de vos
            équipements, stands et supports visuels jusqu’au lieu de
            l’événement. <br />
            Transport des collaborateurs et invités : Mise en place de solutions
            de transport pour vos équipes, clients ou partenaires, afin de
            garantir leur arrivée à temps et en toute sécurité.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Hôtellerie et services d’hébergement</h2>
          </span>
          <p>
            Réservation d’hôtels : Nous négocions pour vous des tarifs
            préférentiels auprès des hôtels partenaires proches de l’événement.{" "}
            <br />
            Gestion des séjours : Prise en charge de toute l'organisation liée à
            l’hébergement, y compris les repas, l’optimisation des durées de
            séjour, et le confort de vos collaborateurs.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Services de photographie et de filmmaking</h2>
          </span>
          <p>
            Couverture photo et vidéo : Nos photographes et vidéastes capturent
            les moments forts de vos événements. <br />
            Création de contenus médias : Nous produisons des vidéos de qualité
            pour alimenter vos réseaux sociaux et votre communication interne.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Gestion des impressions et supports de communication</h2>
          </span>
          <p>
            Impression de matériel : Impression de vos brochures, catalogues,
            cartes de visite, flyers et autres supports pour être prêts à
            distribuer lors de l'événement. <br />
            Distribution ciblée : Organisation de la distribution des supports
            lors de salons ou d’événements pour toucher votre audience de
            manière efficace.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Suivi et analyse post-événement</h2>
          </span>
          <p>
            Évaluation de la performance de l'événement : Mise en place de
            questionnaires et de retours clients pour évaluer l’impact de
            l’événement sur votre visibilité et vos objectifs. <br />
            Rapport détaillé : Nous vous fournissons un rapport complet sur la
            gestion de l'événement, les retours reçus, ainsi que des
            recommandations pour vos futurs projets.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Conseil stratégique et planification événementielle</h2>
          </span>
          <p>
            Consultation avant l'événement : Nous vous aidons à définir vos
            objectifs, à choisir le type d’événement approprié et à établir un
            plan d’action personnalisé.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2>Location d’immobilier pour événements</h2>
          </span>
          <p>
            Location d’espaces événementiels : Nous vous proposons une sélection
            d'espaces à louer pour vos événements (salles de conférence, espaces
            de séminaire, lieux atypiques pour vos événements d'entreprise).{" "}
            <br />
            Optimisation des lieux : Nous vous aidons à choisir le lieu le plus
            adapté à votre événement, en tenant compte de la taille, de la
            configuration et de l'ambiance nécessaire pour atteindre vos
            objectifs.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
        <div className="borad-box">
          <hr />
          <span>
            <h2> Location de matériel pour événements</h2>
          </span>
          <p>
            Matériel de présentation et d’exposition : Location de stands,
            mobilier, écrans, éclairage, et équipements audio-visuels pour
            personnaliser votre espace selon vos besoins. <br />
            Équipements techniques : Fourniture de matériel informatique, de
            projecteurs, de microphones et autres équipements techniques pour
            assurer le bon déroulement de vos conférences ou séminaires.
          </p>
          <span>
            <button>En savoir plus</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
