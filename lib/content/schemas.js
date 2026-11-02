// Schéma du contenu éditable de chaque page.
// - Sert de contenu par défaut tant que rien n'a été modifié dans l'admin.
// - Sert à générer automatiquement les formulaires de l'admin.
// Les textes sont bilingues { fr, en } ; les images sont des URL.

const text = (label, fr, en = "") => ({ type: "text", label, default: { fr, en } });
const area = (label, fr, en = "") => ({ type: "textarea", label, default: { fr, en } });
const markdown = (label, fr, en = "") => ({ type: "markdown", label, default: { fr, en } });
const image = (label, url = "") => ({ type: "image", label, default: url });
const plain = (label, value = "") => ({ type: "plain", label, default: value });
const select = (label, options, value) => ({ type: "select", label, options, default: value });
const list = (label, itemLabel, fields, items) => ({
  type: "list",
  label,
  itemLabel,
  fields,
  default: items,
});

const ICONS = [
  { value: "stand", label: "Stand" },
  { value: "furniture", label: "Mobilier" },
  { value: "staff", label: "Hôtes / personnel" },
  { value: "media", label: "Communication" },
  { value: "logistics", label: "Logistique" },
  { value: "hotel", label: "Hébergement" },
  { value: "people", label: "Groupe" },
  { value: "compass", label: "Découverte" },
  { value: "book", label: "Apprentissage" },
  { value: "check", label: "Organisation" },
  { value: "landmark", label: "Patrimoine / culture" },
  { value: "leaf", label: "Nature" },
  { value: "map", label: "Tourisme / itinéraire" },
  { value: "briefcase", label: "Entreprise / métiers" },
];

const PAGE_LINKS = [
  { value: "salons", label: "Salons professionnels" },
  { value: "teamBuilding", label: "Team Building" },
  { value: "sortie", label: "Sortie pédagogique" },
  { value: "about", label: "À propos" },
  { value: "contact", label: "Contact" },
];

// Photos provisoires (Unsplash), à remplacer par les vraies photos depuis l'admin
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
export const IMG = {
  standVisitors: u("1761195689615-9469b65dac01"),
  convention: u("1785123463585-1ba21ff9ff57"),
  presenter: u("1762028892701-692dc360db08"),
  standCounter: u("1761225646548-bc92fea0dc72"),
  furniture: u("1777499576432-28cb3ff31e70"),
  lobby: u("1560439514-4e9645039924"),
  hall: u("1587825140708-dfaf72ae4b04"),
  conference: u("1511578314322-379afb476865"),
  tbHands: u("1582213782179-e0d53f98f2ca"),
  tbRowing: u("1491911923017-19f90d8d7f83"),
  tbTree: u("1527525443983-6e60c75fff46"),
  tbOutdoor: u("1774599661166-ae302f07dd37"),
  tbWorkshop: u("1522071820081-009f0129c71c"),
  tripBackpacks: u("1594608661623-aa0bd3a69d98"),
  tripRope: u("1517164850305-99a3e65bb47e"),
  tripHeritage: u("1759313196329-8a943fb5695d"),
};

const faqFields = {
  question: { type: "text", label: "Question" },
  answer: { type: "textarea", label: "Réponse" },
};
const stepFields = {
  title: { type: "text", label: "Titre" },
  text: { type: "textarea", label: "Texte" },
};
const pointFields = { text: { type: "text", label: "Point" } };
const pt = (fr, en) => ({ text: { fr, en } });

export const pageSchemas = {
  // ------------------------------------------------------------------ ACCUEIL
  home: {
    label: "Accueil",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Hamac Events | Salons professionnels, stands et événements en Algérie", "Hamac Events | Trade shows, custom stands and events in Algeria"),
          description: area("Description (Google)", "Stands personnalisés, présence sur salons professionnels, team building et sorties pédagogiques : Hamac Events prépare et coordonne vos projets événementiels partout en Algérie.", "Custom stands, trade show presence, team building and educational trips: Hamac Events prepares and coordinates your event projects across Algeria."),
        },
      },
      {
        key: "hero",
        label: "Bandeau principal",
        fields: {
          title: text("Titre", "Votre présence, préparée dans le moindre détail", "Your presence, prepared down to the last detail"),
          text: area("Texte", "Salons professionnels, stands personnalisés, team building et sorties pédagogiques. Nous préparons, coordonnons et accompagnons vos projets partout en Algérie.", "Trade shows, custom stands, team building and educational trips. We prepare, coordinate and support your projects across Algeria."),
          image: image("Image de fond", IMG.standVisitors),
          caption: text("Légende de la photo (seulement pour une vraie réalisation)", "", ""),
        },
      },
      {
        key: "universes",
        label: "Nos univers",
        fields: {
          title: text("Titre", "Trois univers, une même exigence", "Three worlds, one standard"),
          items: list(
            "Univers",
            "Univers",
            {
              title: { type: "text", label: "Titre" },
              text: { type: "textarea", label: "Texte" },
              image: { type: "image", label: "Image" },
              link: { type: "select", label: "Page liée", options: PAGE_LINKS },
            },
            [
              { title: { fr: "Salons professionnels", en: "Trade shows" }, text: { fr: "Stand, mobilier, équipes et coordination pour une présence qui attire et qui convertit.", en: "Stand, furniture, staff and coordination for a presence that draws people in and converts." }, image: IMG.convention, link: "salons" },
              { title: { fr: "Team Building", en: "Team Building" }, text: { fr: "Des moments utiles et fédérateurs, construits autour de vos équipes et de vos objectifs.", en: "Useful, unifying moments built around your teams and your goals." }, image: IMG.tbRowing, link: "teamBuilding" },
              { title: { fr: "Sortie pédagogique", en: "Educational trips" }, text: { fr: "Des sorties organisées de bout en bout pour apprendre en découvrant.", en: "Trips organised end to end, for learning through discovery." }, image: IMG.tripBackpacks, link: "sortie" },
            ]
          ),
        },
      },
      {
        key: "salons",
        label: "Mise en avant Salons & Stands",
        fields: {
          title: text("Titre", "Votre prochain salon commence ici.", "Your next trade show starts here."),
          text: area("Texte", "De la conception de votre stand à son installation, Hamac Events vous accompagne pour créer une présence professionnelle qui attire les visiteurs et valorise votre entreprise.", "From the design of your stand to its installation, Hamac Events helps you build a professional presence that draws visitors and showcases your company."),
          cta: text("Bouton", "Découvrir nos solutions pour les salons professionnels", "Discover our trade show solutions"),
          image: image("Image principale", IMG.presenter),
          standTitle: text("Titre « Stand personnalisé »", "Un stand à votre image, dans votre budget", "A stand that looks like you, within your budget"),
          standText: area("Texte « Stand personnalisé »", "Plan d'implantation, matériaux, signalétique, éclairage : chaque stand est conçu pour vos objectifs commerciaux et la surface réservée.", "Floor plan, materials, signage, lighting: every stand is designed around your sales goals and the space you booked."),
          standImage: image("Image stand", IMG.standCounter),
          points: list("Points clés", "Point", pointFields, [
            pt("Un seul interlocuteur du brief au démontage", "One contact from brief to dismantling"),
            pt("Des partenaires fabricants sélectionnés", "Hand-picked manufacturing partners"),
            pt("Un rétroplanning partagé et tenu", "A shared schedule we stick to"),
          ]),
        },
      },
      {
        key: "experiences",
        label: "Aperçu Team Building & Sorties",
        fields: {
          title: text("Titre", "Faire vivre une expérience à un groupe", "Giving a group an experience to share"),
          tbTitle: text("Titre Team Building", "Team Building", "Team Building"),
          tbText: area("Texte Team Building", "Ateliers, défis en plein air, séminaires : des formats pensés pour la cohésion et l'engagement de vos équipes.", "Workshops, outdoor challenges, retreats: formats designed for team cohesion and engagement."),
          tbImage: image("Image Team Building", IMG.tbOutdoor),
          sortieTitle: text("Titre Sortie", "Sortie pédagogique", "Educational trips"),
          sortieText: area("Texte Sortie", "Transport, visites, encadrement et restauration : des sorties sûres et enrichissantes pour les écoles et les organisations.", "Transport, visits, supervision and meals: safe, enriching trips for schools and organisations."),
          sortieImage: image("Image Sortie", IMG.tripRope),
        },
      },
      {
        key: "why",
        label: "Pourquoi Hamac Events",
        fields: {
          title: text("Titre", "Pourquoi travailler avec nous", "Why work with us"),
          items: list("Engagements", "Engagement", stepFields, [
            { title: { fr: "Un interlocuteur unique", en: "A single point of contact" }, text: { fr: "Un chef de projet suit votre dossier du premier appel au bilan.", en: "One project manager follows your project from the first call to the debrief." } },
            { title: { fr: "Des délais tenus", en: "Deadlines met" }, text: { fr: "Rétroplanning partagé, points d'étape réguliers, pas de surprise le jour J.", en: "Shared schedule, regular check-ins, no surprises on the day." } },
            { title: { fr: "Un réseau de partenaires", en: "A network of partners" }, text: { fr: "Fabricants, traiteurs, transporteurs et hébergeurs que nous connaissons et sélectionnons.", en: "Manufacturers, caterers, carriers and hotels we know and select." } },
            { title: { fr: "Un budget transparent", en: "A transparent budget" }, text: { fr: "Un devis détaillé poste par poste, ajusté à vos priorités.", en: "A detailed, line-by-line quote, adjusted to your priorities." } },
          ]),
        },
      },
      {
        key: "projects",
        label: "Réalisations mises en avant",
        help: "Les projets affichés ici se gèrent dans l'onglet « Réalisations » (option « Mettre en avant sur l'accueil »). La section est masquée s'il n'y en a aucun.",
        fields: {
          title: text("Titre", "Projets récents", "Recent projects"),
          text: area("Texte", "Une sélection de stands et d'événements que nous avons préparés.", "A selection of stands and events we have prepared."),
        },
      },
      {
        key: "blog",
        label: "Aperçu du blog",
        fields: {
          title: text("Titre", "Conseils et actualités", "Tips and news"),
        },
      },
      {
        key: "cta",
        label: "Appel à l'action final",
        fields: {
          title: text("Titre", "Un projet en préparation ?", "Planning a project?"),
          text: area("Texte", "Racontez-nous votre événement : date, lieu, objectifs. Nous revenons vers vous avec une première proposition.", "Tell us about your event: date, venue, goals. We will come back to you with a first proposal."),
          image: image("Image de fond", IMG.lobby),
        },
      },
    ],
  },

  // ------------------------------------------------------- SALONS PROFESSIONNELS
  salons: {
    label: "Salons professionnels",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Salons professionnels et stands personnalisés en Algérie | Hamac Events", "Trade shows and custom stands in Algeria | Hamac Events"),
          description: area("Description (Google)", "Conception de stands sur mesure, mobilier, hôtesses, communication visuelle et logistique : Hamac Events prépare votre participation aux salons professionnels.", "Custom stand design, furniture, hosts, visual communication and logistics: Hamac Events prepares your trade show participation."),
        },
      },
      {
        key: "hero",
        label: "Bandeau principal",
        fields: {
          title: text("Accroche", "Faites de votre prochain salon une vraie opportunité commerciale.", "Make your next trade show a real business opportunity."),
          text: area("Texte", "De la conception de votre stand à son installation, Hamac Events vous accompagne pour créer une présence professionnelle qui attire les visiteurs et valorise votre entreprise.", "From the design of your stand to its installation, Hamac Events helps you build a professional presence that draws visitors and showcases your company."),
          image: image("Image de fond", IMG.hall),
          caption: text("Légende de la photo (seulement pour une vraie réalisation)", "", ""),
        },
      },
      {
        key: "presence",
        label: "Une présence qui vous ressemble",
        fields: {
          title: text("Titre", "Une présence qui vous ressemble", "A presence that looks like you"),
          text: area("Texte", "Lancer un produit, rencontrer des distributeurs, signer de nouveaux clients, asseoir votre image : chaque participation a un objectif commercial. Nous partons du vôtre pour concevoir un espace personnalisé qui attire les visiteurs et facilite les échanges.\n\nUn seul interlocuteur vous accompagne de la conception à l'installation : vous gardez la main sur les choix, nous simplifions tout le reste.", "Launching a product, meeting distributors, signing new clients, building your image: every participation has a business goal. We start from yours to design a tailored space that draws visitors and makes conversations easier.\n\nOne contact supports you from design to installation: you keep control of the choices, we simplify everything else."),
          image: image("Image", IMG.standVisitors),
        },
      },
      {
        key: "solutions",
        label: "Nos solutions",
        fields: {
          title: text("Titre", "Nos solutions pour les salons professionnels", "Our trade show solutions"),
          text: area("Introduction", "Choisissez une prestation précise ou confiez-nous l'ensemble de votre participation.", "Choose a single service or hand us your entire participation."),
          items: list(
            "Solutions",
            "Solution",
            {
              icon: { type: "select", label: "Icône", options: ICONS },
              title: { type: "text", label: "Titre" },
              text: { type: "textarea", label: "Texte" },
            },
            [
              { icon: "stand", title: { fr: "Stands personnalisés et aménagement d'espace", en: "Custom stands and space design" }, text: { fr: "Conception 3D, fabrication, montage et démontage de votre stand.", en: "3D design, build, setup and dismantling of your stand." } },
              { icon: "furniture", title: { fr: "Mobilier et équipements", en: "Furniture and equipment" }, text: { fr: "Comptoirs, salons d'accueil, écrans, éclairage et vitrines en location.", en: "Counters, lounge areas, screens, lighting and display cases for hire." } },
              { icon: "staff", title: { fr: "Hôtes, hôtesses et renfort de personnel", en: "Hosts and extra staff" }, text: { fr: "Accueil, animation, traduction et qualification des visiteurs.", en: "Welcome, activation, translation and visitor qualification." } },
              { icon: "media", title: { fr: "Communication et contenu visuel", en: "Communication and visual content" }, text: { fr: "Kakémonos, signalétique, supports imprimés, photo et vidéo du salon.", en: "Roll-ups, signage, printed materials, show photos and video." } },
              { icon: "logistics", title: { fr: "Coordination et logistique", en: "Coordination and logistics" }, text: { fr: "Transport, stockage et relation avec l'organisateur via nos partenaires spécialisés.", en: "Transport, storage and organiser relations through our specialist partners." } },
              { icon: "hotel", title: { fr: "Services complémentaires", en: "Additional services" }, text: { fr: "Hébergement des équipes, restauration et déplacements lorsque nécessaire.", en: "Team accommodation, catering and travel when needed." } },
            ]
          ),
        },
      },
      {
        key: "stand",
        label: "Stand personnalisé",
        fields: {
          title: text("Titre", "Le stand personnalisé", "The custom stand"),
          text: area("Texte", "Votre stand est votre vitrine pendant trois ou quatre jours. Nous le concevons à partir de votre image, de vos produits et du budget alloué, puis nous coordonnons sa fabrication et son installation avec des partenaires de confiance.", "Your stand is your shop window for three or four days. We design it around your brand, your products and your budget, then coordinate its build and installation with trusted partners."),
          points: list("Ce que comprend l'accompagnement", "Point", pointFields, [
            pt("Plan d'implantation et circulation des visiteurs", "Floor plan and visitor flow"),
            pt("Rendu 3D validé avant fabrication", "3D render approved before build"),
            pt("Choix des matériaux, de la signalétique et de l'éclairage", "Choice of materials, signage and lighting"),
            pt("Suivi du montage sur place et réception du stand", "On-site setup supervision and stand handover"),
            pt("Stockage et réutilisation des éléments pour vos prochains salons", "Storage and reuse of elements for your next shows"),
          ]),
          image: image("Image principale", IMG.standCounter),
          image2: image("Image secondaire", IMG.furniture),
        },
      },
      {
        key: "process",
        label: "Notre accompagnement",
        fields: {
          title: text("Titre", "Notre accompagnement", "How we work with you"),
          text: area("Introduction", "Quatre étapes, un même interlocuteur.", "Four steps, one point of contact."),
          steps: list("Étapes", "Étape", stepFields, [
            { title: { fr: "Comprendre le besoin", en: "Understand the need" }, text: { fr: "Objectifs, salon visé, surface, budget et délais : nous faisons le point avec vous.", en: "Goals, target show, space, budget and timing: we review everything with you." } },
            { title: { fr: "Proposer une solution", en: "Propose a solution" }, text: { fr: "Concept, rendu 3D et devis détaillé, ajustés jusqu'à validation.", en: "Concept, 3D render and detailed quote, adjusted until approved." } },
            { title: { fr: "Préparer et coordonner", en: "Prepare and coordinate" }, text: { fr: "Fabrication, prestataires, logistique et démarches avec l'organisateur.", en: "Build, suppliers, logistics and paperwork with the organiser." } },
            { title: { fr: "Accompagner le projet", en: "Support the project" }, text: { fr: "Présence au montage, suivi pendant le salon, démontage et bilan.", en: "On site at setup, support during the show, dismantling and debrief." } },
          ]),
        },
      },
      {
        key: "vr",
        label: "Module VR (visite virtuelle)",
        help: "Collez le lien Matterport (ou d'une autre visite 3D). La visite ne se charge qu'au clic, pour ne pas ralentir la page. Laissez le lien vide pour masquer la section.",
        fields: {
          title: text("Titre", "Entrez dans l'expérience avant même le salon.", "Step into the experience before the show even starts."),
          text: area("Texte", "Découvrez nos solutions et projetez-vous dans votre futur espace grâce à une expérience immersive en réalité virtuelle.", "Discover our solutions and picture your future space through an immersive virtual reality experience."),
          url: plain("Lien de la visite virtuelle", "https://my.matterport.com/show/?m=5dGmFsFJgs9"),
          cover: image("Image d'aperçu", "https://my.matterport.com/api/v2/player/models/5dGmFsFJgs9/thumb/"),
          caption: text("Légende", "Visite 3D : stand Ceram Decor, SAFEX Alger", "3D tour: Ceram Decor stand, SAFEX Algiers"),
          points: list("Ce que permet la visite", "Point", pointFields, [
            pt("Maquette 3D et plans 2D", "3D model and 2D floor plans"),
            pt("Mesure interactive des espaces", "Interactive measurements"),
            pt("Visite guidée automatique", "Automatic guided tour"),
            pt("Étiquettes interactives : photos, vidéos, documents", "Interactive tags: photos, videos, documents"),
          ]),
        },
      },
      {
        key: "gallery",
        label: "Réalisations / Nos solutions en images",
        help: "S'il existe des réalisations de la catégorie « Salons professionnels » (onglet « Réalisations »), elles sont affichées. Sinon, la section devient « Nos solutions en images » avec les visuels d'inspiration ci-dessous, signalés comme tels.",
        fields: {
          title: text("Titre (réalisations)", "Nos réalisations", "Our work"),
          text: area("Texte (réalisations)", "Quelques stands et participations que nous avons préparés.", "A few stands and participations we have prepared."),
          inspirationTitle: text("Titre (sans réalisations)", "Nos solutions en images", "Our solutions in pictures"),
          inspirationText: area("Texte (sans réalisations)", "Différents types de stands et d'aménagements que nous pouvons concevoir pour vous.", "Different types of stands and layouts we can design for you."),
          inspirationNote: text("Mention sous les visuels", "Visuels d'inspiration, non contractuels.", "Inspiration visuals, for illustration only."),
          images: list("Visuels d'inspiration", "Visuel", { image: { type: "image", label: "Image" }, title: { type: "text", label: "Type de stand ou d'aménagement" } }, [
            { image: IMG.standCounter, title: { fr: "Stand sur mesure avec comptoir d'accueil", en: "Custom stand with reception counter" } },
            { image: IMG.convention, title: { fr: "Espace d'exposition ouvert", en: "Open exhibition space" } },
            { image: IMG.furniture, title: { fr: "Mobilier et salon de rendez-vous", en: "Furniture and meeting lounge" } },
            { image: IMG.presenter, title: { fr: "Zone de présentation produit", en: "Product presentation area" } },
            { image: IMG.standVisitors, title: { fr: "Accueil et échanges visiteurs", en: "Visitor welcome and conversations" } },
            { image: IMG.hall, title: { fr: "Implantation dans un hall d'exposition", en: "Layout within an exhibition hall" } },
          ]),
        },
      },
      {
        key: "faq",
        label: "FAQ",
        fields: {
          title: text("Titre", "Questions fréquentes", "Frequently asked questions"),
          items: list("Questions", "Question", faqFields, [
            { question: { fr: "Combien de temps à l'avance faut-il vous contacter ?", en: "How far in advance should we contact you?" }, answer: { fr: "Idéalement trois mois avant le salon pour un stand sur mesure. Pour du mobilier, du personnel ou de la communication seule, quelques semaines peuvent suffire.", en: "Ideally three months before the show for a custom stand. For furniture, staff or communication only, a few weeks can be enough." } },
            { question: { fr: "Travaillez-vous avec tous les budgets ?", en: "Do you work with any budget?" }, answer: { fr: "Oui. Nous proposons des solutions modulaires réutilisables comme des stands entièrement sur mesure, et nous vous conseillons sur les postes prioritaires.", en: "Yes. We offer reusable modular solutions as well as fully custom stands, and advise you on where to focus your budget." } },
            { question: { fr: "Gérez-vous les démarches avec l'organisateur du salon ?", en: "Do you handle paperwork with the show organiser?" }, answer: { fr: "Oui : dossier technique, plans, branchements électriques, badges et horaires de montage sont suivis par votre chef de projet.", en: "Yes: technical file, plans, power connections, badges and setup times are handled by your project manager." } },
            { question: { fr: "Intervenez-vous en dehors d'Alger ?", en: "Do you work outside Algiers?" }, answer: { fr: "Nous intervenons partout en Algérie et pouvons accompagner des participations à l'international selon les projets.", en: "We work throughout Algeria and can support international participations depending on the project." } },
            { question: { fr: "Pouvons-nous réutiliser notre stand ?", en: "Can we reuse our stand?" }, answer: { fr: "Oui. Nous concevons des éléments démontables et pouvons les stocker entre deux salons.", en: "Yes. We design elements that can be dismantled and can store them between shows." } },
          ]),
        },
      },
      {
        key: "blog",
        label: "Nos conseils",
        fields: {
          title: text("Titre", "Nos conseils sur les salons professionnels", "Our trade show advice"),
        },
      },
      {
        key: "cta",
        label: "Appel à l'action final",
        fields: {
          title: text("Titre", "Vous préparez votre prochain salon ? Parlons de votre projet.", "Preparing your next trade show? Let's talk about your project."),
          text: area("Texte", "Indiquez le salon, la date et la surface réservée : nous revenons vers vous sous 48 h avec une première approche.", "Tell us the show, the date and the space booked: we will come back to you within 48 hours with a first approach."),
          points: list("Éléments de réassurance", "Point", pointFields, [
            pt("Réponse rapide", "Fast reply"),
            pt("Devis personnalisé", "Tailored quote"),
            pt("Accompagnement adapté à votre projet", "Support adapted to your project"),
          ]),
        },
      },
    ],
  },

  // ---------------------------------------------------------------- TEAM BUILDING
  teamBuilding: {
    label: "Team Building",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Team building sur mesure pour entreprises en Algérie | Hamac Events", "Custom team building for companies in Algeria | Hamac Events"),
          description: area("Description (Google)", "Activités, défis et séminaires de team building conçus pour la cohésion et l'engagement de vos équipes.", "Team building activities, challenges and retreats designed for cohesion and engagement."),
        },
      },
      {
        key: "hero",
        label: "Bandeau principal",
        fields: {
          title: text("Titre", "Des moments qui rapprochent vraiment vos équipes", "Moments that truly bring your teams together"),
          text: area("Texte", "Des expériences utiles, fédératrices et mémorables, construites autour de vos collaborateurs et de vos objectifs.", "Useful, unifying and memorable experiences, built around your people and your goals."),
          image: image("Image de fond", IMG.tbRowing),
        },
      },
      {
        key: "approach",
        label: "Notre approche",
        fields: {
          title: text("Titre", "Notre approche", "Our approach"),
          text: area("Texte", "Un bon team building ne se résume pas à une activité. Nous commençons par comprendre votre équipe : sa taille, son contexte, ce qui la fait avancer et ce qui la freine. Le format, le lieu et le rythme de la journée découlent de ces objectifs.", "Good team building is more than an activity. We start by understanding your team: its size, its context, what drives it and what holds it back. The format, venue and pace of the day follow from those goals."),
          image: image("Image", IMG.tbWorkshop),
        },
      },
      {
        key: "benefits",
        label: "Bénéfices",
        fields: {
          title: text("Titre", "Ce que vos équipes y gagnent", "What your teams gain"),
          items: list("Bénéfices", "Bénéfice", stepFields, [
            { title: { fr: "Cohésion", en: "Cohesion" }, text: { fr: "Des liens qui se créent entre services et entre niveaux.", en: "Bonds built across departments and levels." } },
            { title: { fr: "Communication", en: "Communication" }, text: { fr: "Des échanges plus simples et plus directs au quotidien.", en: "Simpler, more direct everyday exchanges." } },
            { title: { fr: "Collaboration", en: "Collaboration" }, text: { fr: "Apprendre à résoudre ensemble, sous contrainte et avec plaisir.", en: "Learning to solve problems together, under pressure and with pleasure." } },
            { title: { fr: "Engagement", en: "Engagement" }, text: { fr: "Une équipe qui se sent reconnue s'investit davantage.", en: "A team that feels valued gives more." } },
            { title: { fr: "Expérience partagée", en: "Shared experience" }, text: { fr: "Des souvenirs communs qui restent bien après la journée.", en: "Shared memories that last long after the day." } },
          ]),
        },
      },
      {
        key: "activities",
        label: "Activités et formats",
        fields: {
          title: text("Titre", "Activités et formats", "Activities and formats"),
          text: area("Introduction", "Quelques formats que nous organisons souvent. Tous sont adaptables.", "A few formats we often run. All can be adapted."),
          items: list(
            "Activités",
            "Activité",
            {
              title: { type: "text", label: "Titre" },
              text: { type: "textarea", label: "Description" },
              image: { type: "image", label: "Image" },
              duration: { type: "text", label: "Durée" },
              group: { type: "text", label: "Taille de groupe" },
            },
            [
              { title: { fr: "Défis en plein air", en: "Outdoor challenges" }, text: { fr: "Courses d'orientation, épreuves sportives et jeux d'équipe en pleine nature.", en: "Orienteering, sports events and team games in the open air." }, image: IMG.tbOutdoor, duration: { fr: "Demi-journée ou journée", en: "Half day or full day" }, group: { fr: "15 à 200 personnes", en: "15 to 200 people" } },
              { title: { fr: "Activités nautiques", en: "Water activities" }, text: { fr: "Aviron, kayak ou régate pour apprendre à ramer dans le même sens.", en: "Rowing, kayaking or regattas to learn to pull in the same direction." }, image: IMG.tbRowing, duration: { fr: "Demi-journée", en: "Half day" }, group: { fr: "10 à 60 personnes", en: "10 to 60 people" } },
              { title: { fr: "Ateliers créatifs et collaboratifs", en: "Creative and collaborative workshops" }, text: { fr: "Ateliers de co-construction, cuisine, construction ou jeux de rôle en intérieur.", en: "Co-creation, cooking, building or role-play workshops indoors." }, image: IMG.tbWorkshop, duration: { fr: "2 à 4 heures", en: "2 to 4 hours" }, group: { fr: "8 à 80 personnes", en: "8 to 80 people" } },
              { title: { fr: "Séminaires et journées d'équipe", en: "Retreats and team days" }, text: { fr: "Lieu, salles, restauration, hébergement et animations réunis dans un même programme.", en: "Venue, rooms, catering, accommodation and activities in one programme." }, image: IMG.tbTree, duration: { fr: "1 à 3 jours", en: "1 to 3 days" }, group: { fr: "20 à 300 personnes", en: "20 to 300 people" } },
            ]
          ),
        },
      },
      {
        key: "programmes",
        label: "Activités proposées",
        help: "Les activités affichées ici se gèrent dans l'onglet « Programmes » (catégorie Team building).",
        fields: {
          title: text("Titre", "Activités proposées", "Activities on offer"),
          text: area("Texte", "Notre catalogue d'activités, à combiner selon vos objectifs et la taille de votre équipe.", "Our activity catalogue, to combine around your goals and team size."),
        },
      },
      {
        key: "custom",
        label: "Programme sur mesure",
        fields: {
          title: text("Titre", "Un programme sur mesure", "A tailor-made programme"),
          text: area("Texte", "Vous avez une date, un groupe et une intention ? Nous construisons le programme complet : lieu, transport, activités, restauration et animation.", "You have a date, a group and an intention? We build the full programme: venue, transport, activities, catering and hosting."),
          points: list("Points", "Point", pointFields, [
            pt("Objectifs définis avec la direction ou les RH", "Goals set with management or HR"),
            pt("Repérage et sélection du lieu", "Venue scouting and selection"),
            pt("Animation et encadrement sur place", "On-site hosting and supervision"),
          ]),
          image: image("Image", IMG.tbHands),
        },
      },
      {
        key: "testimonials",
        label: "Galerie et témoignages",
        fields: {
          title: text("Titre", "Ils ont vécu l'expérience", "They lived the experience"),
          items: list(
            "Témoignages",
            "Témoignage",
            {
              quote: { type: "textarea", label: "Citation" },
              author: { type: "plain", label: "Nom" },
              role: { type: "text", label: "Fonction / entreprise" },
            },
            [
              { quote: { fr: "Une journée parfaitement organisée, des équipes qui en parlent encore des mois après.", en: "A perfectly organised day; our teams were still talking about it months later." }, author: "Témoignage à compléter", role: { fr: "Responsable RH, entreprise industrielle", en: "HR manager, industrial company" } },
            ]
          ),
        },
      },
      {
        key: "faq",
        label: "FAQ",
        fields: {
          title: text("Titre", "Questions fréquentes", "Frequently asked questions"),
          items: list("Questions", "Question", faqFields, [
            { question: { fr: "À partir de combien de participants ?", en: "From how many participants?" }, answer: { fr: "Nous organisons des formats dès 8 personnes et jusqu'à plusieurs centaines.", en: "We run formats from 8 people up to several hundred." } },
            { question: { fr: "Vous déplacez-vous dans nos locaux ?", en: "Can you come to our premises?" }, answer: { fr: "Oui, de nombreux ateliers peuvent se dérouler dans vos locaux ou dans une salle proche.", en: "Yes, many workshops can take place on your premises or in a nearby venue." } },
            { question: { fr: "Quel délai prévoir ?", en: "How much notice do you need?" }, answer: { fr: "Comptez trois à six semaines pour une journée, davantage pour un séminaire avec hébergement.", en: "Allow three to six weeks for a day event, more for a residential retreat." } },
          ]),
        },
      },
      {
        key: "cta",
        label: "Appel à l'action final",
        fields: {
          title: text("Titre", "Construisons votre prochain team building", "Let's build your next team building"),
          text: area("Texte", "Dites-nous combien vous êtes, quand, et ce que vous voulez en retirer.", "Tell us how many you are, when, and what you want to get out of it."),
        },
      },
    ],
  },

  // ---------------------------------------------------------- SORTIE PÉDAGOGIQUE
  sortie: {
    label: "Sortie pédagogique",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Sorties pédagogiques organisées pour écoles et groupes | Hamac Events", "Educational trips for schools and groups | Hamac Events"),
          description: area("Description (Google)", "Sorties scolaires et pédagogiques organisées de bout en bout : transport, visites, encadrement et restauration.", "School and educational trips organised end to end: transport, visits, supervision and meals."),
        },
      },
      {
        key: "hero",
        label: "Bandeau principal",
        fields: {
          title: text("Titre", "Apprendre en découvrant, sans se soucier de l'organisation", "Learning through discovery, without worrying about logistics"),
          text: area("Texte", "Sorties pédagogiques et tourisme intérieur : des découvertes culturelles, naturelles et professionnelles organisées pour les établissements et les groupes.", "Educational trips and domestic tourism: cultural, natural and professional discoveries organised for schools and groups."),
          image: image("Image de fond", IMG.tripBackpacks),
        },
      },
      {
        key: "intro",
        label: "Ce que nous proposons",
        fields: {
          title: text("Titre", "Quatre façons de découvrir", "Four ways to discover"),
          text: area("Texte", "Chaque sortie est construite autour de l'âge des participants, des objectifs pédagogiques et des contraintes de l'établissement. Transport, encadrement, repas et autorisations sont pris en charge.", "Each trip is built around the participants' age, the learning objectives and the institution's constraints. Transport, supervision, meals and permissions are taken care of."),
          items: list(
            "Univers",
            "Univers",
            {
              icon: { type: "select", label: "Icône", options: ICONS },
              title: { type: "text", label: "Titre" },
              text: { type: "textarea", label: "Texte" },
            },
            [
              { icon: "landmark", title: { fr: "Découverte culturelle et historique", en: "Cultural and historical discovery" }, text: { fr: "Visites de sites historiques, culturels et patrimoniaux.", en: "Visits to historic, cultural and heritage sites." } },
              { icon: "leaf", title: { fr: "Découverte de la nature", en: "Discovering nature" }, text: { fr: "Excursions et expériences pour découvrir les richesses naturelles de différentes régions.", en: "Excursions and experiences to discover the natural riches of different regions." } },
              { icon: "map", title: { fr: "Tourisme intérieur", en: "Domestic tourism" }, text: { fr: "Programmes de découverte adaptés aux groupes et aux établissements.", en: "Discovery programmes adapted to groups and institutions." } },
              { icon: "briefcase", title: { fr: "Visites et découvertes professionnelles", en: "Professional visits" }, text: { fr: "Entreprises, métiers et lieux de production pour une expérience éducative concrète.", en: "Companies, trades and production sites for a hands-on learning experience." } },
            ]
          ),
          image: image("Image", IMG.tripRope),
        },
      },
      {
        key: "programmes",
        label: "Destinations et programmes",
        help: "Les programmes affichés ici se gèrent dans l'onglet « Programmes » (catégorie Sortie pédagogique).",
        fields: {
          title: text("Titre", "Destinations et programmes", "Destinations and programmes"),
          text: area("Texte", "Nos programmes du moment. Chacun peut être adapté à votre groupe.", "Our current programmes. Each one can be adapted to your group."),
        },
      },
      {
        key: "custom",
        label: "Sortie sur mesure",
        fields: {
          title: text("Titre", "Construire une sortie selon vos besoins", "Build a trip around your needs"),
          text: area("Texte", "Vous avez une destination en tête ou un thème à travailler ? Nous composons le programme, le budget par participant et la logistique.", "Have a destination in mind or a topic to cover? We put together the programme, the per-participant budget and the logistics."),
          points: list("Points", "Point", pointFields, [
            pt("Programme validé avec l'équipe pédagogique", "Programme approved with the teaching staff"),
            pt("Encadrement et sécurité du groupe", "Group supervision and safety"),
            pt("Budget clair par participant", "Clear per-participant budget"),
          ]),
          image: image("Image", IMG.tripHeritage),
        },
      },
      {
        key: "faq",
        label: "FAQ",
        fields: {
          title: text("Titre", "Questions fréquentes", "Frequently asked questions"),
          items: list("Questions", "Question", faqFields, [
            { question: { fr: "Pour quels âges organisez-vous des sorties ?", en: "What ages do you organise trips for?" }, answer: { fr: "Du primaire à l'université, ainsi que pour des groupes d'adultes.", en: "From primary school to university, as well as adult groups." } },
            { question: { fr: "Le transport est-il compris ?", en: "Is transport included?" }, answer: { fr: "Oui, nous organisons le transport aller-retour avec des partenaires agréés.", en: "Yes, we arrange return transport with approved partners." } },
          ]),
        },
      },
      {
        key: "cta",
        label: "Appel à l'action final",
        fields: {
          title: text("Titre", "Recevoir un programme pour votre groupe", "Get a programme for your group"),
          text: area("Texte", "Indiquez le niveau, le nombre de participants et la période souhaitée.", "Tell us the level, number of participants and preferred period."),
        },
      },
    ],
  },

  // --------------------------------------------------------------------- À PROPOS
  about: {
    label: "À propos",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "À propos de Hamac Events | Agence événementielle en Algérie", "About Hamac Events | Event agency in Algeria"),
          description: area("Description (Google)", "Qui est Hamac Events, notre vision, nos valeurs et notre façon d'accompagner nos clients.", "Who Hamac Events is, our vision, our values and how we support our clients."),
        },
      },
      {
        key: "hero",
        label: "Présentation",
        fields: {
          title: text("Titre", "Une équipe qui prépare, coordonne et reste à vos côtés", "A team that prepares, coordinates and stays by your side"),
          text: area("Texte", "Hamac Events accompagne les entreprises, les établissements et les organisations dans leurs projets événementiels partout en Algérie. Notre métier : transformer un objectif en un événement concret, bien préparé et sans mauvaise surprise.", "Hamac Events supports companies, institutions and organisations with their event projects across Algeria. Our job: turning a goal into a concrete, well-prepared event with no bad surprises."),
          image: image("Image", IMG.tbWorkshop),
        },
      },
      {
        key: "vision",
        label: "Notre vision",
        fields: {
          title: text("Titre", "Notre vision", "Our vision"),
          text: area("Texte", "Un événement réussi se joue bien avant le jour J. Nous croyons à la préparation, à la transparence et à la relation de confiance avec nos clients et nos partenaires.", "A successful event is decided long before the day itself. We believe in preparation, transparency and trust with our clients and partners."),
        },
      },
      {
        key: "values",
        label: "Nos valeurs",
        fields: {
          title: text("Titre", "Nos valeurs et notre façon de travailler", "Our values and how we work"),
          items: list("Valeurs", "Valeur", stepFields, [
            { title: { fr: "Écoute", en: "Listening" }, text: { fr: "Votre objectif guide chaque décision.", en: "Your goal guides every decision." } },
            { title: { fr: "Rigueur", en: "Rigour" }, text: { fr: "Rétroplanning, devis détaillés et suivi régulier.", en: "Schedules, detailed quotes and regular follow-up." } },
            { title: { fr: "Engagement", en: "Commitment" }, text: { fr: "Nous sommes présents sur le terrain, du montage au bilan.", en: "We are on the ground, from setup to debrief." } },
            { title: { fr: "Transparence", en: "Transparency" }, text: { fr: "Des choix expliqués et un budget maîtrisé.", en: "Choices explained and budget under control." } },
          ]),
        },
      },
      {
        key: "expertise",
        label: "Nos univers d'expertise",
        fields: {
          title: text("Titre", "Nos univers d'expertise", "Our areas of expertise"),
          text: area("Texte", "Trois métiers complémentaires, une même équipe.", "Three complementary services, one team."),
        },
      },
      {
        key: "cta",
        label: "Appel à l'action final",
        fields: {
          title: text("Titre", "Faisons connaissance", "Let's get to know each other"),
          text: area("Texte", "Un projet, une question, une idée : écrivez-nous.", "A project, a question, an idea: write to us."),
        },
      },
    ],
  },

  // ---------------------------------------------------------------------- CONTACT
  contact: {
    label: "Contact",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Contact et demande de devis | Hamac Events", "Contact and quote request | Hamac Events"),
          description: area("Description (Google)", "Contactez Hamac Events pour votre salon professionnel, team building ou sortie pédagogique.", "Contact Hamac Events for your trade show, team building or educational trip."),
        },
      },
      {
        key: "hero",
        label: "En-tête",
        fields: {
          title: text("Titre", "Parlons de votre projet", "Let's talk about your project"),
          text: area("Texte", "Remplissez le formulaire ou appelez-nous. Nous répondons à chaque demande sous 48 h ouvrées.", "Fill in the form or call us. We answer every request within 2 business days."),
        },
      },
    ],
  },

  // ------------------------------------------------------------------------- BLOG
  blog: {
    label: "Blog",
    sections: [
      {
        key: "seo",
        label: "Référencement (SEO)",
        fields: {
          title: text("Titre de la page (Google)", "Blog : conseils salons, team building et sorties | Hamac Events", "Blog: trade show, team building and trip advice | Hamac Events"),
          description: area("Description (Google)", "Conseils pratiques et actualités pour réussir vos salons professionnels, team building et sorties.", "Practical advice and news to make your trade shows, team building and trips a success."),
        },
      },
      {
        key: "hero",
        label: "En-tête",
        fields: {
          title: text("Titre", "Conseils et actualités", "Tips and news"),
          text: area("Texte", "Ce que nous apprenons sur le terrain, partagé pour vous aider à préparer vos projets.", "What we learn on the ground, shared to help you prepare your projects."),
        },
      },
    ],
  },

  // ------------------------------------------------------------- MENTIONS LÉGALES
  legal: {
    label: "Mentions légales",
    sections: [
      {
        key: "content",
        label: "Contenu",
        fields: {
          title: text("Titre", "Mentions légales", "Legal notice"),
          body: markdown("Texte (Markdown)", "## Éditeur du site\n\nHamac Events, Algérie.\n\n*À compléter : raison sociale, adresse du siège, registre du commerce, NIF, directeur de la publication.*\n\n## Hébergement\n\n*À compléter : hébergeur du site.*\n\n## Données personnelles\n\nLes informations envoyées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Vous pouvez demander leur suppression en nous écrivant.", "## Publisher\n\nHamac Events, Algeria.\n\n## Personal data\n\nInformation sent through the contact form is only used to answer your request. You can ask for its deletion by writing to us."),
        },
      },
    ],
  },

  // ----------------------------------------------------------- PARAMÈTRES GLOBAUX
  settings: {
    label: "Coordonnées et réseaux",
    sections: [
      {
        key: "contact",
        label: "Coordonnées",
        fields: {
          phone: plain("Téléphone", "0731 14 16 54"),
          email: plain("E-mail", "contact@hamac-events.com"),
          address: text("Adresse", "Alger, Algérie", "Algiers, Algeria"),
          hours: text("Horaires", "Du dimanche au jeudi, 9 h – 17 h", "Sunday to Thursday, 9 am – 5 pm"),
        },
      },
      {
        key: "social",
        label: "Réseaux sociaux",
        fields: {
          facebook: plain("Facebook (URL)", "https://www.facebook.com/profile.php?id=100075646883318"),
          instagram: plain("Instagram (URL)", "https://www.instagram.com/hamac.events/"),
          linkedin: plain("LinkedIn (URL)", "https://www.linkedin.com/company/hamac-alg%C3%A9rie/"),
        },
      },
      {
        key: "footer",
        label: "Pied de page",
        fields: {
          text: area("Texte de présentation", "Salons professionnels, stands personnalisés, team building et sorties pédagogiques, partout en Algérie.", "Trade shows, custom stands, team building and educational trips across Algeria."),
        },
      },
    ],
  },
};

export const PAGE_KEYS = Object.keys(pageSchemas);
export const ICON_OPTIONS = ICONS;
