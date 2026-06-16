export const stats = [
  { value: 20, suffix: '+', labelKey: 'stats.years' },
  { value: 50, suffix: '+', labelKey: 'stats.countries' },
  { value: 100, suffix: 'K+', labelKey: 'stats.shipments' },
  { value: 99.2, suffix: '%', labelKey: 'stats.ontime', decimal: true },
]

export type NetworkRegion = {
  id: string
  nameKey: string
  agents: number
  cities: string[]
  x: number
  y: number
}

export const networkRegions: NetworkRegion[] = [
  { id: 'north-africa', nameKey: 'network.northAfrica', agents: 12, cities: ['Casablanca', 'Tanger', 'Alger', 'Tunis'], x: 48, y: 36 },
  { id: 'west-africa', nameKey: 'network.westAfrica', agents: 8, cities: ['Dakar', 'Abidjan', 'Lagos', 'Accra'], x: 40, y: 52 },
  { id: 'central-africa', nameKey: 'network.centralAfrica', agents: 5, cities: ['Douala', 'Libreville', 'Brazzaville'], x: 52, y: 60 },
  { id: 'europe', nameKey: 'network.europe', agents: 25, cities: ['Marseille', 'Barcelone', 'Rotterdam', 'Hambourg'], x: 50, y: 22 },
  { id: 'asia', nameKey: 'network.asia', agents: 18, cities: ['Shanghai', 'Singapour', 'Dubaï', 'Mumbai'], x: 74, y: 38 },
  { id: 'americas', nameKey: 'network.americas', agents: 15, cities: ['New York', 'Santos', 'Los Angeles', 'Montréal'], x: 18, y: 38 },
]

export type ServiceData = {
  id: string
  icon: string
  color: string
  href: string
  titleKey: string
  descKey: string
  featuresKey: string
}

export const services: ServiceData[] = [
  { id: 'sea-freight', icon: 'Ship', color: '#1a237e', href: '/services/sea-freight', titleKey: 'services.seaFreight.title', descKey: 'services.seaFreight.desc', featuresKey: 'services.seaFreight.features' },
  { id: 'air-freight', icon: 'Plane', color: '#283593', href: '/services/air-freight', titleKey: 'services.airFreight.title', descKey: 'services.airFreight.desc', featuresKey: 'services.airFreight.features' },
  { id: 'road-freight', icon: 'Truck', color: '#1a237e', href: '/services/road-freight', titleKey: 'services.roadFreight.title', descKey: 'services.roadFreight.desc', featuresKey: 'services.roadFreight.features' },
  { id: 'transit-customs', icon: 'ClipboardCheck', color: '#283593', href: '/services/transit-customs', titleKey: 'services.transitCustoms.title', descKey: 'services.transitCustoms.desc', featuresKey: 'services.transitCustoms.features' },
  { id: 'supply-chain', icon: 'Warehouse', color: '#1a237e', href: '/services/supply-chain', titleKey: 'services.supplyChain.title', descKey: 'services.supplyChain.desc', featuresKey: 'services.supplyChain.features' },
  { id: 'import-export', icon: 'ArrowLeftRight', color: '#283593', href: '/services/import-export', titleKey: 'services.importExport.title', descKey: 'services.importExport.desc', featuresKey: 'services.importExport.features' },
]

export type ServiceDetail = {
  id: string
  icon: string
  subServices: string[]
  features: {
    title: string
    desc: string
  }[]
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'sea-freight': {
    id: 'sea-freight',
    icon: 'Ship',
    subServices: ['FCL (Full Container Load)', 'LCL (Less Container Load)', 'Breakbulk', 'Ro-Ro', 'Conteneurs frigorifiques', 'Out-of-gauge cargo'],
    features: [
      { title: 'FCL & LCL', desc: 'Transport de conteneurs complets ou groupage maritime selon vos volumes' },
      { title: 'Ports majeurs', desc: 'Accès aux principaux ports mondiaux via notre réseau d\'agents agréés' },
      { title: 'Documentation', desc: 'Gestion complète des documents : B/L, certificats d\'origine, manifestes' },
      { title: 'Assurance', desc: 'Couverture assurance cargo complète pour vos expéditions maritimes' },
    ],
  },
  'air-freight': {
    id: 'air-freight',
    icon: 'Plane',
    subServices: ['Express cargo', 'Charter aérien', 'Consolidation aérienne', 'Marchandises dangereuses', 'Colis fragiles', 'Température contrôlée'],
    features: [
      { title: 'Express & Standard', desc: 'Options express et standard pour tous types de marchandises urgentes ou non' },
      { title: 'Aéroports majeurs', desc: 'Connexions directes depuis/vers Casablanca, Paris, Amsterdam, Dubaï...' },
      { title: 'Tracking temps réel', desc: 'Suivi de votre fret aérien en temps réel via notre plateforme' },
      { title: 'Expertise AWB', desc: 'Gestion complète des Air Waybills et formalités douanières aériennes' },
    ],
  },
  'road-freight': {
    id: 'road-freight',
    icon: 'Truck',
    subServices: ['FTL (Full Truck Load)', 'LTL (Less Truck Load)', 'Groupage', 'Transport frigorifique', 'Matières dangereuses ADR', 'Transport exceptionnel'],
    features: [
      { title: 'Réseau Maghreb-Europe', desc: 'Lignes régulières Maroc ↔ Espagne ↔ France ↔ Italie et au-delà' },
      { title: 'Flotte moderne', desc: 'Véhicules adaptés : frigos, bâchés, plateau, citerne selon votre cargo' },
      { title: 'Suivi GPS', desc: 'Localisation en temps réel de vos camions tout au long du trajet' },
      { title: 'Douane & Transit', desc: 'Formalités douanières aux frontières gérées par nos équipes' },
    ],
  },
  'transit-customs': {
    id: 'transit-customs',
    icon: 'ClipboardCheck',
    subServices: ['Dédouanement import', 'Dédouanement export', 'Régime de transit', 'Régime suspensif', 'Entrepôt sous douane', 'Conseil réglementaire'],
    features: [
      { title: 'Experts douaniers', desc: 'Commissionnaires en douane agréés maîtrisant la législation marocaine' },
      { title: 'Tous régimes', desc: 'Import/Export définitif, transit, admission temporaire, entrepôt douanier' },
      { title: 'Documentation', desc: 'DUM, factures, certificats, licences : gestion administrative complète' },
      { title: 'Conseil proactif', desc: 'Anticipation des exigences douanières pour éviter les blocages' },
    ],
  },
  'supply-chain': {
    id: 'supply-chain',
    icon: 'Warehouse',
    subServices: ['Entreposage', 'Distribution', 'Gestion des stocks', 'Cross-docking', 'Fulfillment', 'Conditionnement'],
    features: [
      { title: 'Entrepôts stratégiques', desc: 'Espaces de stockage à Casablanca et dans les principales zones franches' },
      { title: 'WMS intégré', desc: 'Gestion des stocks avec visibilité en temps réel sur vos inventaires' },
      { title: 'Distribution', desc: 'Livraison last-mile au Maroc et expédition internationale depuis nos hubs' },
      { title: 'Valeur ajoutée', desc: 'Conditionnement, étiquetage, assemblage léger selon vos besoins' },
    ],
  },
  'import-export': {
    id: 'import-export',
    icon: 'ArrowLeftRight',
    subServices: ['Logistique import', 'Logistique export', 'Trade consulting', 'Incoterms advisory', 'Financement trade', 'Domiciliation douanière'],
    features: [
      { title: 'Import complet', desc: 'Prise en charge de A à Z : fournisseur étranger jusqu\'à votre entrepôt' },
      { title: 'Export optimisé', desc: 'Préparation export, documentation, choix du mode et de l\'Incoterm optimal' },
      { title: 'Conseil trade', desc: 'Accompagnement réglementaire, fiscal et logistique pour vos échanges' },
      { title: 'Financement', desc: 'Conseil sur les crédits documentaires, remises documentaires, SWIFT' },
    ],
  },
}

export type TrackingEvent = {
  date: string
  status: 'completed' | 'current' | 'pending'
  label: string
  location: string
}

export type TrackingData = {
  id: string
  origin: string
  destination: string
  status: 'in-transit' | 'delivered' | 'pending'
  estimatedDelivery: string
  timeline: TrackingEvent[]
}

export const trackingDatabase: Record<string, TrackingData> = {
  'RITT-2026-001234': {
    id: 'RITT-2026-001234',
    origin: 'Casablanca, MA',
    destination: 'Marseille, FR',
    status: 'in-transit',
    estimatedDelivery: '2026-06-16',
    timeline: [
      { date: '2026-06-10 08:00', status: 'completed', label: 'Départ Casablanca', location: 'Casablanca, MA' },
      { date: '2026-06-10 14:00', status: 'completed', label: 'Arrivée Port Tanger', location: 'Tanger, MA' },
      { date: '2026-06-11 06:00', status: 'current', label: 'En transit — Méditerranée', location: 'Méditerranée' },
      { date: '2026-06-15 08:00', status: 'pending', label: 'Arrivée Marseille', location: 'Marseille, FR' },
      { date: '2026-06-15 12:00', status: 'pending', label: 'Dédouanement', location: 'Marseille, FR' },
      { date: '2026-06-16 09:00', status: 'pending', label: 'Livraison finale', location: 'Marseille, FR' },
    ],
  },
  'RITT-2026-002567': {
    id: 'RITT-2026-002567',
    origin: 'Shanghai, CN',
    destination: 'Casablanca, MA',
    status: 'delivered',
    estimatedDelivery: '2026-06-12',
    timeline: [
      { date: '2026-05-28 09:00', status: 'completed', label: 'Départ Shanghai', location: 'Shanghai, CN' },
      { date: '2026-06-02 15:00', status: 'completed', label: 'Transit Port Saïd', location: 'Port Saïd, EG' },
      { date: '2026-06-08 10:00', status: 'completed', label: 'Arrivée Casablanca', location: 'Casablanca, MA' },
      { date: '2026-06-09 09:00', status: 'completed', label: 'Dédouanement', location: 'Casablanca, MA' },
      { date: '2026-06-12 11:00', status: 'completed', label: 'Livraison finale', location: 'Casablanca, MA' },
    ],
  },
}

export const testimonials = [
  {
    id: 1,
    name: 'Mohammed Alaoui',
    company: 'ATLAS Import & Export',
    role: 'Directeur Général',
    text: 'RITT gère nos imports depuis la Chine avec une fiabilité exceptionnelle. Le suivi en temps réel et la réactivité de leur équipe font vraiment la différence.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophie Bertrand',
    company: 'Euromaroc Textiles',
    role: 'Responsable Logistique',
    text: 'Partenaire de confiance depuis 5 ans pour nos exports vers l\'Europe. Professionnalisme, ponctualité et tarifs compétitifs sont au rendez-vous.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amadou Diallo',
    company: 'West Africa Trading Co.',
    role: 'Supply Chain Manager',
    text: 'RITT nous a ouvert l\'accès au marché marocain avec une expertise douanière imbattable. Nous recommandons sans hésitation.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Carlos Mendoza',
    company: 'Iberian Auto Parts',
    role: 'Directeur des Achats',
    text: 'La ligne routière Espagne-Maroc de RITT est excellente. Transit rapide, documentation impeccable, toujours à l\'heure.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Fatima Zahra El Fassi',
    company: 'CasaFresh Agroalimentaire',
    role: 'PDG',
    text: 'Pour nos exports de produits frais, RITT est irremplaçable. Leur chaîne du froid et leur réactivité sont notre garantie de qualité.',
    rating: 5,
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  readTime: number
  author: string
}

export const blogPosts: Record<string, BlogPost> = {
  'incoterms-2020-guide': {
    slug: 'incoterms-2020-guide',
    title: 'Guide complet des Incoterms 2020 pour les exportateurs marocains',
    excerpt: 'Comprendre les Incoterms 2020 est essentiel pour optimiser vos contrats d\'export. Découvrez les 11 termes et leur impact sur votre logistique.',
    content: `Les Incoterms (International Commercial Terms) sont des règles standardisées publiées par la Chambre de Commerce Internationale qui définissent les responsabilités entre acheteurs et vendeurs dans les transactions commerciales internationales.

**Les Incoterms les plus utilisés au Maroc**

**FOB (Free On Board)** — Le vendeur livre la marchandise à bord du navire désigné par l'acheteur au port d'embarquement convenu. C'est l'Incoterm le plus couramment utilisé dans les exports marocains.

**CIF (Cost, Insurance and Freight)** — Le vendeur assume les frais de transport et d'assurance jusqu'au port de destination. Idéal pour les exportateurs qui souhaitent contrôler la chaîne logistique.

**DDP (Delivered Duty Paid)** — Le vendeur assume tous les risques et frais jusqu'à la destination finale, y compris les droits de douane. L'option la plus complète mais aussi la plus risquée pour l'exportateur.

**Conseils pratiques pour les exportateurs**

1. Choisissez votre Incoterm en fonction de votre capacité à gérer la logistique internationale
2. Négociez les Incoterms en tenant compte de votre pouvoir de négociation avec l'acheteur
3. Assurez-vous que votre couverture d'assurance est adaptée à l'Incoterm choisi
4. Consultez un freight forwarder expert comme RITT avant de finaliser votre contrat`,
    date: '2026-05-15',
    category: 'Guide',
    readTime: 7,
    author: 'Équipe RITT',
  },
  'logistique-afrique-tendances-2026': {
    slug: 'logistique-afrique-tendances-2026',
    title: 'Logistique en Afrique : Les grandes tendances 2026',
    excerpt: 'Le secteur logistique africain connaît une transformation profonde. Digitalisation, infrastructure et Zone de Libre-Échange : ce qui change en 2026.',
    content: `L'Afrique est en train de vivre une révolution logistique sans précédent. La Zone de Libre-Échange Continentale Africaine (ZLECAf), la digitalisation des ports et l'essor du e-commerce transforment profondément le paysage.

**La ZLECAf : Un changement de paradigme**

La Zone de Libre-Échange Continentale Africaine, entrée en vigueur en 2021, commence à produire ses effets tangibles. Les échanges intra-africains augmentent et de nouvelles opportunités s'ouvrent pour les freight forwarders qui disposent d'un réseau continental.

**Digitalisation des ports africains**

Le port de Casablanca, hub logistique majeur d'Afrique du Nord, a accéléré sa transformation digitale avec le déploiement de systèmes de tracking en temps réel et de guichets uniques électroniques.

**L'essor du e-commerce**

La croissance du e-commerce africain crée une demande croissante pour des solutions logistiques last-mile adaptées aux spécificités locales.

**Opportunités pour les exportateurs**

Pour les entreprises marocaines, ces évolutions représentent une opportunité unique de se positionner comme hub logistique entre l'Europe, le Moyen-Orient et l'Afrique subsaharienne.`,
    date: '2026-04-22',
    category: 'Tendances',
    readTime: 5,
    author: 'Équipe RITT',
  },
  'optimiser-supply-chain-maroc': {
    slug: 'optimiser-supply-chain-maroc',
    title: 'Comment optimiser votre supply chain depuis le Maroc',
    excerpt: 'Le Maroc offre des avantages compétitifs uniques pour la supply chain. Voici comment en tirer le meilleur parti avec les bons partenaires logistiques.',
    content: `Le Maroc s'est imposé comme une plateforme logistique incontournable entre l'Europe, l'Afrique et le Moyen-Orient. La stratégie nationale Maroc Logistics 2030 renforce encore ce positionnement.

**Les atouts du Maroc pour votre supply chain**

La position géographique du Maroc est exceptionnelle : à 14 km de l'Europe par le détroit de Gibraltar, avec un accès direct aux marchés africains et atlantiques. Le port Tanger Med, l'un des premiers ports d'Afrique, en est l'illustration parfaite.

**Zones Franches : Un avantage fiscal majeur**

Les zones franches comme Tanger Free Zone, Casablanca Finance City et les zones d'accélération industrielle offrent des avantages fiscaux considérables pour les opérations logistiques et industrielles.

**Digitalisation et Traçabilité**

La transformation digitale de la logistique marocaine permet aujourd'hui une traçabilité complète de bout en bout. Les systèmes de tracking en temps réel, les échanges EDI et les plateformes B2B facilitent la gestion de votre supply chain.

**Le rôle du freight forwarder**

Un freight forwarder expérimenté comme RITT peut vous aider à concevoir une supply chain optimale, en combinant les différents modes de transport et en gérant l'ensemble des aspects douaniers et réglementaires.`,
    date: '2026-03-10',
    category: 'Conseil',
    readTime: 6,
    author: 'Équipe RITT',
  },
}

export const faqItems = [
  {
    question: 'Quels sont les délais de transit typiques pour le Sea Freight ?',
    answer: 'Les délais varient selon la destination : Casablanca-Marseille (4-7 jours), Casablanca-Shanghai (18-25 jours), Casablanca-New York (12-16 jours). Ces délais sont donnés à titre indicatif et peuvent varier selon les conditions.',
  },
  {
    question: 'Proposez-vous l\'assurance cargo pour mes expéditions ?',
    answer: 'Oui, RITT propose une assurance cargo complète pour tous les modes de transport. Nous travaillons avec des assureurs agréés pour vous offrir une couverture adaptée à la nature et à la valeur de vos marchandises.',
  },
  {
    question: 'Puis-je suivre mes expéditions en temps réel ?',
    answer: 'Absolument. Notre outil de tracking en ligne vous permet de suivre vos shipments 24h/24 avec votre numéro de référence RITT, BL ou AWB. Des notifications automatiques vous alertent à chaque étape clé.',
  },
  {
    question: 'Quelle est la procédure pour demander un devis ?',
    answer: 'Vous pouvez demander un devis via notre formulaire en ligne (wizard en 4 étapes), par email ou par téléphone. Notre équipe commerciale vous répond dans les 24h avec une offre personnalisée et compétitive.',
  },
  {
    question: 'Gérez-vous le dédouanement au Maroc et à l\'international ?',
    answer: 'Oui, RITT dispose d\'une équipe de commissionnaires en douane agréés. Nous gérons le dédouanement import et export au Maroc, ainsi que via notre réseau d\'agents à l\'international.',
  },
  {
    question: 'Quels sont les Incoterms que vous recommandez ?',
    answer: 'Le choix de l\'Incoterm dépend de votre situation et de votre pouvoir de négociation. Nos experts vous conseillent sur le meilleur Incoterm pour chaque opération. FOB et CIF sont les plus courants dans nos flux.',
  },
]

export const goodsTypes = [
  'Produits alimentaires', 'Textiles & Vêtements', 'Matières premières', 'Produits chimiques',
  'Machines & Équipements', 'Produits électroniques', 'Véhicules & Pièces', 'Produits pharmaceutiques',
  'Matériaux de construction', 'Produits agricoles', 'Marchandises dangereuses', 'Autres',
]

export const countries = [
  'Maroc', 'France', 'Espagne', 'Italie', 'Allemagne', 'Pays-Bas', 'Belgique', 'Portugal',
  'Royaume-Uni', 'Sénégal', 'Côte d\'Ivoire', 'Nigeria', 'Ghana', 'Cameroun', 'Gabon',
  'Chine', 'Inde', 'Émirats Arabes Unis', 'Arabie Saoudite', 'Turquie',
  'États-Unis', 'Canada', 'Brésil', 'Afrique du Sud', 'Égypte', 'Tunisie', 'Algérie',
]
