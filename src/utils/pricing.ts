import type { Room } from "../types/room";
import type { Season } from "../types/season";
import { seasons } from "../data/seasons";
import { extras } from "../data/extras";
import { countNights, parseISODate } from "./dates";
import { getSeasonFromDate } from "./season";

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceDetail {
  nights: number;
  roomTotal: number;        // prix de la chambre × nuits
  discount: number;         // réduction de saison (0 si non atteinte)
  extraLines: PriceLine[];  // une ligne par option choisie
  total: number;
  season: Season | null;    // saison de la date d'arrivée
  offerApplied: boolean;
}

// Prix de chaque option choisie. Une option "nuit" est multipliée par le nombre de nuits.
function computeExtras(extraIds: string[], nights: number): PriceLine[] {
  return extras
    .filter((e) => extraIds.includes(e.id))
    .map((e) => ({ label: e.label, amount: e.per === "nuit" ? e.price * nights : e.price }));
}

// Prix complet d'un séjour. L'offre dépend de la saison de la date
// d'ARRIVÉE, pas du thème choisi par le visiteur, et ne s'applique qu'à la chambre.
// Exemple : arrivée en novembre, 7 nuits à 45 000 -> 315 000 - 20 % = 252 000 (+ options).
export function computePrice(room: Room, checkIn: string, checkOut: string, extraIds: string[] = []): PriceDetail {
  const nights = countNights(checkIn, checkOut);
  const roomTotal = room.pricePerNight * nights;
  const season = checkIn ? seasons[getSeasonFromDate(parseISODate(checkIn))] : null;
  const offerApplied = season !== null && nights >= season.offer.minNights;
  const discount = offerApplied ? Math.round(roomTotal * season.offer.discount) : 0;
  const extraLines = computeExtras(extraIds, nights);
  const extrasTotal = extraLines.reduce((sum, line) => sum + line.amount, 0);

  return { nights, roomTotal, discount, extraLines, total: roomTotal - discount + extrasTotal, season, offerApplied };
}
