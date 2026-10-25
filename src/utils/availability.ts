import { existingBookings } from "../data/bookings";

// La nuit du "iso" est-elle déjà prise pour cette chambre ?
// Une réservation du 2 au 5 occupe les nuits du 2, 3 et 4 (le 5 est libre).
export function isDateBooked(roomId: string, iso: string): boolean {
  return existingBookings.some(
    (b) => b.roomId === roomId && b.checkIn <= iso && iso < b.checkOut
  );
}

// La chambre est-elle libre sur toute la période ?
// Deux périodes se chevauchent si chacune commence avant la fin de l'autre.
export function isRoomAvailable(roomId: string, checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return true;
  return !existingBookings.some(
    (b) => b.roomId === roomId && b.checkIn < checkOut && checkIn < b.checkOut
  );
}
