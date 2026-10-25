import type { SeasonId } from "../types/season";

// Saison d'une date, selon le mois (0 = janvier … 11 = décembre).
// Exemple : 14 octobre -> mois 9 -> "automne".
export function getSeasonFromDate(date: Date): SeasonId {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "printemps";
  if (month >= 5 && month <= 7) return "ete";
  if (month >= 8 && month <= 10) return "automne";
  return "hiver";
}
