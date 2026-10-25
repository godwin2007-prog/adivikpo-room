import type { Room } from "../types/room";

// Raccourcis vers les dossiers d'images (dans /public/images).
const CH = "/images/chambres";
const SDB = "/images/salles-de-bain";
const JA = "/images/jardins";

// Liste des chambres. Pour ajouter une chambre, il suffit d'ajouter
// un objet ici : les pages Accueil, Chambres et Détail se mettent à jour.
export const rooms: Room[] = [
  {
    id: "suite-prestige",
    name: "Suite Prestige",
    tagline: "La plus grande pièce de la maison, avec un coin salon.",
    description:
      "Une suite lumineuse de 48 m² avec un grand lit capitonné, un salon pour lire ou travailler et une salle de bain en marbre blanc. Idéale pour un long séjour.",
    pricePerNight: 65000,
    capacity: 2,
    size: 48,
    bed: "Lit king size",
    amenities: ["Coin salon", "Climatisation", "Wi-Fi", "Bureau", "Coffre-fort"],
    images: [`${CH}/suite-prestige.jpg`, `${SDB}/sdb-marbre.jpg`, `${JA}/terrasse.jpg`],
  },
  {
    id: "panorama",
    name: "Chambre Panorama",
    tagline: "Une baie vitrée sur toute la largeur de la chambre.",
    description:
      "Au dernier étage, la chambre Panorama donne sur la ville. Le matin, la lumière entre par la baie vitrée. Salle de bain avec double vasque.",
    pricePerNight: 48000,
    capacity: 2,
    size: 32,
    bed: "Lit queen size",
    amenities: ["Vue sur la ville", "Climatisation", "Wi-Fi", "Douche à l'italienne"],
    images: [`${CH}/panorama.jpg`, `${SDB}/sdb-arche.jpg`, `${JA}/allee-glycine.jpg`],
  },
  {
    id: "twin-ambre",
    name: "Chambre Ambre",
    tagline: "Deux lits séparés, pour collègues ou amis.",
    description:
      "Deux lits doubles, des tons chauds et un coin fauteuil. La chambre Ambre convient aux déplacements professionnels à deux.",
    pricePerNight: 42000,
    capacity: 3,
    size: 30,
    bed: "Deux lits doubles",
    amenities: ["Deux lits", "Climatisation", "Wi-Fi", "Télévision"],
    images: [`${CH}/twin-ambre.jpg`, `${SDB}/sdb-claire.jpg`, `${JA}/jardin-tropical.jpg`],
  },
  {
    id: "lagune",
    name: "Chambre Lagune",
    tagline: "Une chambre mansardée aux murs bleu lagune.",
    description:
      "Sous les toits, une chambre calme et colorée, avec une tête de lit rayée et une salle de bain aux carreaux noirs et blancs.",
    pricePerNight: 35000,
    capacity: 2,
    size: 22,
    bed: "Lit double",
    amenities: ["Calme absolu", "Ventilateur", "Wi-Fi", "Douche"],
    images: [`${CH}/lagune.jpg`, `${SDB}/sdb-arche.jpg`, `${JA}/allee-glycine.jpg`],
  },
  {
    id: "suite-jungle",
    name: "Suite Jungle",
    tagline: "Un lit rond sous une fresque de feuillages tropicaux.",
    description:
      "La suite la plus originale de la maison : lit rond, fresque murale, balancelle suspendue et grande salle de bain avec baignoire.",
    pricePerNight: 58000,
    capacity: 2,
    size: 40,
    bed: "Lit rond",
    amenities: ["Baignoire", "Balancelle", "Climatisation", "Wi-Fi"],
    images: [`${CH}/suite-jungle.jpg`, `${SDB}/sdb-rayee.jpg`, `${JA}/jardin-tropical.jpg`],
  },
  {
    id: "nature",
    name: "Chambre Nature",
    tagline: "Bois, tissages et plantes, ouverte sur le jardin.",
    description:
      "Plafond en bois tressé, tissus artisanaux et accès direct au jardin. Pour ceux qui veulent dormir au milieu des plantes.",
    pricePerNight: 45000,
    capacity: 2,
    size: 34,
    bed: "Lit queen size",
    amenities: ["Accès jardin", "Ventilateur de plafond", "Wi-Fi", "Douche"],
    images: [`${CH}/nature.jpg`, `${SDB}/sdb-marbre.jpg`, `${JA}/terrasse.jpg`],
  },
];

// Retrouve une chambre à partir de son id (undefined si elle n'existe pas).
export function findRoom(id: string | undefined): Room | undefined {
  return rooms.find((room) => room.id === id);
}
