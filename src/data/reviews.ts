// Avis des voyageurs (simulés).
export interface Review {
  roomId: string;
  author: string;
  city: string;
  rating: number; // de 1 à 5
  text: string;
}

export const reviews: Review[] = [
  { roomId: "suite-prestige", author: "Aïcha K.", city: "Cotonou", rating: 5, text: "Calme absolu, chambre immense et un accueil aux petits soins. Le petit-déjeuner dans le jardin est un vrai moment." },
  { roomId: "suite-prestige", author: "Marc D.", city: "Lyon", rating: 5, text: "Parfait pour une semaine de travail : bureau, Wi-Fi rapide et silence total le soir." },
  { roomId: "panorama", author: "Fifamè A.", city: "Porto-Novo", rating: 4, text: "La vue au réveil vaut le détour. Chambre très propre, je reviendrai." },
  { roomId: "twin-ambre", author: "Kofi M.", city: "Accra", rating: 5, text: "Idéal pour un déplacement à deux collègues. Personnel discret et efficace." },
  { roomId: "lagune", author: "Sophie L.", city: "Bruxelles", rating: 5, text: "Petite chambre pleine de charme, la salle de bain noir et blanc est superbe." },
  { roomId: "suite-jungle", author: "Rachidi O.", city: "Parakou", rating: 5, text: "Le lit rond et la fresque, on se croirait ailleurs. Parfait pour un anniversaire." },
  { roomId: "suite-jungle", author: "Elena R.", city: "Madrid", rating: 4, text: "Très originale et confortable. La baignoire après une journée en ville, un bonheur." },
  { roomId: "nature", author: "Gildas H.", city: "Abomey-Calavi", rating: 5, text: "Dormir à côté du jardin, entendre les oiseaux le matin… On oublie qu'on est en ville." },
];
