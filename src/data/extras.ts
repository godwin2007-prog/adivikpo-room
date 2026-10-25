// Options ajoutables à l'étape 2 de la réservation.
export interface Extra {
  id: string;
  label: string;
  description: string;
  price: number;
  per: "sejour" | "nuit"; // prix fixe, ou multiplié par le nombre de nuits
}

export const extras: Extra[] = [
  {
    id: "navette",
    label: "Navette aéroport",
    description: "Aller-retour depuis l'aéroport de Cotonou.",
    price: 15000,
    per: "sejour",
  },
  {
    id: "diner",
    label: "Dîner chaque soir",
    description: "Menu du jour servi sur la terrasse.",
    price: 8000,
    per: "nuit",
  },
  {
    id: "depart-tardif",
    label: "Départ tardif",
    description: "Gardez la chambre jusqu'à 16 h le dernier jour.",
    price: 10000,
    per: "sejour",
  },
  {
    id: "decoration",
    label: "Surprise en chambre",
    description: "Fleurs et décoration pour un anniversaire.",
    price: 20000,
    per: "sejour",
  },
];
