import { reviews, type Review } from "../data/reviews";

export function getRoomReviews(roomId: string): Review[] {
  return reviews.filter((r) => r.roomId === roomId);
}

// Note moyenne arrondie à 0,1. Exemple : 5 et 4 -> 4.5.
export function getRoomRating(roomId: string): { average: number; count: number } {
  const list = getRoomReviews(roomId);
  if (list.length === 0) return { average: 0, count: 0 };
  const sum = list.reduce((total, r) => total + r.rating, 0);
  return { average: Math.round((sum / list.length) * 10) / 10, count: list.length };
}
