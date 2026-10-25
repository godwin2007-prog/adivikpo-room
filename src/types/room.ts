// Description d'une chambre : toutes les pages utilisent ce même type.
export interface Room {
  id: string;            // utilisé dans l'URL : /chambres/suite-prestige
  name: string;
  tagline: string;       // phrase courte affichée sur la carte
  description: string;   // texte complet de la page détail
  pricePerNight: number; // en FCFA
  capacity: number;      // nombre maximum de voyageurs
  size: number;          // surface en m²
  bed: string;
  amenities: string[];
  images: string[];      // la première image sert de couverture
}
