import ContactForm from "../ContactForm/ContactForm";
import "./InfoBoard.css";

const InfoBoard = () => {
  const servicesData = [
    {
      title: "Conception 2D et 3D pour la communication visuelle",
      description: `Création de chartes graphiques : Élaboration de visuels cohérents avec l'identité de votre marque pour vos supports de communication (brochures, affiches, flyers). 
        Conception de stands personnalisés : Création de stands à la fois esthétiques et fonctionnels, avec un design sur-mesure qui reflète l’ADN de votre entreprise. 
        Maquettes 3D : Pour vous permettre de visualiser l'aménagement de votre espace avant l'événement, en prenant en compte chaque détail visuel.`,
    },
    {
      title: "Gestion complète des salons et foires professionnels",
      description: `Accompagnement personnalisé durant l’événement : Nous nous chargeons de la logistique de votre participation, y compris la gestion des inscriptions, l’accueil des visiteurs, et l'animation de votre stand. 
        Réservation d’espace : Nous prenons en charge les démarches administratives pour réserver votre stand et vous assurer d’être situé dans le meilleur emplacement. 
        Assistance en temps réel : Gestion des imprévus et assistance à chaque étape pour garantir la fluidité et la réussite de votre présence sur le salon.`,
    },
    {
      title: "Services de transport",
      description: `Gestion du transport de matériel : Organisation du transport de vos équipements, stands et supports visuels jusqu’au lieu de l’événement. 
        Transport des collaborateurs et invités : Mise en place de solutions de transport pour vos équipes, clients ou partenaires, afin de garantir leur arrivée à temps et en toute sécurité.`,
    },
    {
      title: "Hôtellerie et services d’hébergement",
      description: `Réservation d’hôtels : Nous négocions pour vous des tarifs préférentiels auprès des hôtels partenaires proches de l’événement. 
        Gestion des séjours : Prise en charge de toute l'organisation liée à l’hébergement, y compris les repas, l’optimisation des durées de séjour, et le confort de vos collaborateurs.`,
    },
    {
      title: "Services de photographie et de filmmaking",
      description: `Couverture photo et vidéo : Nos photographes et vidéastes capturent les moments forts de vos événements. 
        Création de contenus médias : Nous produisons des vidéos de qualité pour alimenter vos réseaux sociaux et votre communication interne.`,
    },
    {
      title: "Gestion des impressions et supports de communication",
      description: `Impression de matériel : Impression de vos brochures, catalogues, cartes de visite, flyers et autres supports pour être prêts à distribuer lors de l'événement. 
        Distribution ciblée : Organisation de la distribution des supports lors de salons ou d’événements pour toucher votre audience de manière efficace.`,
    },
    {
      title: "Suivi et analyse post-événement",
      description: `Évaluation de la performance de l'événement : Mise en place de questionnaires et de retours clients pour évaluer l’impact de l’événement sur votre visibilité et vos objectifs. 
        Rapport détaillé : Nous vous fournissons un rapport complet sur la gestion de l'événement, les retours reçus, ainsi que des recommandations pour vos futurs projets.`,
    },
    {
      title: "Conseil stratégique et planification événementielle",
      description: `Consultation avant l'événement : Nous vous aidons à définir vos objectifs, à choisir le type d’événement approprié et à établir un plan d’action personnalisé.`,
    },
    {
      title: "Location d’immobilier pour événements",
      description: `Location d’espaces événementiels : Nous vous proposons une sélection d'espaces à louer pour vos événements (salles de conférence, espaces de séminaire, lieux atypiques pour vos événements d'entreprise). 
        Optimisation des lieux : Nous vous aidons à choisir le lieu le plus adapté à votre événement, en tenant compte de la taille, de la configuration et de l'ambiance nécessaire pour atteindre vos objectifs.`,
    },
    {
      title: "Location de matériel pour événements",
      description: `Matériel de présentation et d’exposition : Location de stands, mobilier, écrans, éclairage, et équipements audio-visuels pour personnaliser votre espace selon vos besoins. 
        Équipements techniques : Fourniture de matériel informatique, de projecteurs, de microphones et autres équipements techniques pour assurer le bon déroulement de vos conférences ou séminaires.`,
    },
  ];

  return (
    <div className="board">
      <div className="title-board">
        <h2 style={{ fontSize: "25px", marginBottom: "25px" }}>
          Nos services d’accompagnement pour les entreprises :
        </h2>
        <p fontSize="18px">
          Chez Hamac Events, nous comprenons que chaque entreprise a des besoins
          uniques lorsqu'il s'agit de la gestion de ses événements
          professionnels. C’est pourquoi nous proposons un accompagnement
          sur-mesure, adapté à vos objectifs et à vos valeurs. Nous agissons
          comme un véritable partenaire stratégique pour vous accompagner dans
          la conception et l'exécution de vos événements, qu’il s’agisse de
          salons professionnels, de séminaires, de conférences ou de toute
          autre manifestation.
        </p>
      </div>
      <div className="grid-board">
        {servicesData.map((service, index) => (
          <div className="borad-box" key={index}>
            <hr />
            <span>
              <h2>{service.title}</h2>
            </span>
            <p>{service.description}</p>
            <span>
              <a href="#InfoHr">En savoir plus</a>
            </span>
          </div>
        ))}
      </div>
      <hr className=" infoHr" id="InfoHr" />
      <div style={{ width: "100%" }}>
        <div className="right">
          <h2>Nous sommes toujours a votre disposition!</h2>
          <p>Envoyez nous vos cordonnées pour que nous puissions vous aider.</p>
          <ContactForm motif={`Accompagnement pour les entreprises`} />
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
