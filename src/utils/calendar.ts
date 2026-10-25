import { toISODate, todayISO } from "./dates";
import { isDateBooked, isRoomAvailable } from "./availability";

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

// Cases d'un mois pour une grille de 7 colonnes, lundi en premier.
// null = case vide avant le 1er du mois.
// Exemple : si le 1er est un mercredi -> [null, null, "…-01", "…-02", …]
export function getMonthCells(year: number, month: number): (string | null)[] {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array(offset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(toISODate(new Date(year, month, day)));
  }
  return cells;
}

// Peut-on cliquer sur ce jour ?
// Un jour occupé reste cliquable comme jour de DÉPART (on part le matin où l'autre arrive).
export function isSelectable(roomId: string, iso: string, range: DateRange): boolean {
  if (iso < todayISO()) return false;
  if (!isDateBooked(roomId, iso)) return true;
  const choosingCheckOut = range.checkIn !== "" && range.checkOut === "" && iso > range.checkIn;
  return choosingCheckOut && isRoomAvailable(roomId, range.checkIn, iso);
}

// Nouvelle sélection après un clic :
// 1er clic = arrivée, 2e clic = départ, 3e clic = on recommence.
export function nextRange(range: DateRange, clicked: string, roomId: string): DateRange {
  const { checkIn, checkOut } = range;
  if (!checkIn || checkOut || clicked <= checkIn) return { checkIn: clicked, checkOut: "" };
  if (isRoomAvailable(roomId, checkIn, clicked)) return { checkIn, checkOut: clicked };
  return { checkIn: clicked, checkOut: "" };
}
