export type SeasonId = "printemps" | "ete" | "automne" | "hiver";

// Réduction appliquée quand l'arrivée tombe dans cette saison.
export interface SeasonOffer {
  title: string;     // ex. "-20 % dès 7 nuits"
  discount: number;  // 0.2 = 20 %
  minNights: number; // nombre de nuits minimum pour en profiter
}

export interface Season {
  id: SeasonId;
  label: string;          // "Automne"
  heroText: string;       // phrase sous le titre de l'accueil
  description: string;    // texte de la carte "Choisissez votre saison"
  heroImages: string[];   // images du carrousel d'accueil pour cette saison
  offer: SeasonOffer;
}
