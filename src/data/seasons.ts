import type { Season, SeasonId } from "../types/season";

const CH = "/images/chambres";
const SDB = "/images/salles-de-bain";
const JA = "/images/jardins";

// Les 4 saisons du site. Les couleurs de chaque saison sont dans index.css.
export const seasons: Record<SeasonId, Season> = {
  printemps: {
    id: "printemps",
    label: "Printemps",
    heroText: "Le jardin refleurit : glycine en fleurs et petits-déjeuners au soleil du matin.",
    description: "Glycine en fleurs, matins frais et jardin en pleine pousse.",
    heroImages: [`${JA}/allee-glycine.jpg`, `${CH}/panorama.jpg`, `${JA}/jardin-tropical.jpg`, `${CH}/lagune.jpg`],
    offer: { title: "-10 % dès 3 nuits", discount: 0.1, minNights: 3 },
  },
  ete: {
    id: "ete",
    label: "Été",
    heroText: "Longues soirées sur la terrasse et chambres fraîches pour la sieste.",
    description: "Soirées sur la terrasse, sieste au frais et dîners dehors.",
    heroImages: [`${JA}/terrasse.jpg`, `${CH}/suite-jungle.jpg`, `${JA}/jardin-tropical.jpg`, `${CH}/panorama.jpg`],
    offer: { title: "-15 % dès 5 nuits", discount: 0.15, minNights: 5 },
  },
  automne: {
    id: "automne",
    label: "Automne",
    heroText: "Lumière douce et jardin calme : la saison idéale pour un long séjour.",
    description: "Lumière dorée, maison calme : idéal pour un long séjour.",
    heroImages: [`${CH}/nature.jpg`, `${CH}/twin-ambre.jpg`, `${JA}/allee-glycine.jpg`, `${CH}/suite-prestige.jpg`],
    offer: { title: "-20 % dès 7 nuits", discount: 0.2, minNights: 7 },
  },
  hiver: {
    id: "hiver",
    label: "Hiver",
    heroText: "Finir l'année au calme, loin de l'agitation de la ville.",
    description: "Fêtes de fin d'année au calme, bains chauds et grands lits.",
    heroImages: [`${CH}/suite-prestige.jpg`, `${SDB}/sdb-marbre.jpg`, `${CH}/lagune.jpg`, `${CH}/panorama.jpg`],
    offer: { title: "-10 % dès 2 nuits", discount: 0.1, minNights: 2 },
  },
};

// Ordre d'affichage dans le sélecteur.
export const seasonOrder: SeasonId[] = ["printemps", "ete", "automne", "hiver"];
