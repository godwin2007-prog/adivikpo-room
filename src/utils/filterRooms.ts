import type { Room } from "../types/room";
import { isRoomAvailable } from "./availability";

export type SortOption = "recommande" | "prix-asc" | "prix-desc";

export interface RoomSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
  maxPrice: number; // 0 = pas de limite
  sort: SortOption;
}

// Garde les chambres qui correspondent à la recherche.
function matches(room: Room, s: RoomSearch): boolean {
  if (room.capacity < s.guests) return false;
  if (s.maxPrice > 0 && room.pricePerNight > s.maxPrice) return false;
  return isRoomAvailable(room.id, s.checkIn, s.checkOut);
}

// Filtre puis trie. [...list] crée une copie : sort() ne modifie pas la liste d'origine.
export function filterRooms(list: Room[], search: RoomSearch): Room[] {
  const result = list.filter((room) => matches(room, search));
  if (search.sort === "prix-asc") return [...result].sort((a, b) => a.pricePerNight - b.pricePerNight);
  if (search.sort === "prix-desc") return [...result].sort((a, b) => b.pricePerNight - a.pricePerNight);
  return result;
}
