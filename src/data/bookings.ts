import { addDays, todayISO } from "../utils/dates";

// Une réservation déjà prise par un autre client.
export interface ExistingBooking {
  roomId: string;
  checkIn: string;
  checkOut: string; // jour de départ : la chambre est libre ce soir-là
}

// Crée une réservation de "fromDay" à "toDay" jours après aujourd'hui.
// Dates relatives : la démo montre toujours des jours occupés, quel que soit le jour.
function stay(roomId: string, fromDay: number, toDay: number): ExistingBooking {
  const today = todayISO();
  return { roomId, checkIn: addDays(today, fromDay), checkOut: addDays(today, toDay) };
}

// Réservations simulées. Avec un backend, cette liste viendrait de l'API.
export const existingBookings: ExistingBooking[] = [
  stay("suite-prestige", 2, 6), stay("suite-prestige", 12, 15),
  stay("panorama", 0, 3), stay("panorama", 9, 13),
  stay("twin-ambre", 5, 9),
  stay("lagune", 1, 4), stay("lagune", 15, 20),
  stay("suite-jungle", 3, 10),
  stay("nature", 7, 8), stay("nature", 18, 24),
];
