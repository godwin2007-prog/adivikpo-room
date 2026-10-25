import { getRoomRating, getRoomReviews } from "../../utils/reviews";
import Stars from "../ui/Stars";

// Avis de la page détail d'une chambre.
export default function RoomReviews({ roomId }: { roomId: string }) {
  const list = getRoomReviews(roomId);
  const { average, count } = getRoomRating(roomId);
  if (count === 0) return null;

  return (
    <section>
      <h2 className="flex items-center gap-3 text-3xl">
        {average.toLocaleString("fr-FR")} <Stars rating={average} size={18} />
        <span className="font-texte text-sm text-pierre">({count} avis)</span>
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {list.map((r) => (
          <blockquote key={r.author} className="rounded-sm bg-white p-6">
            <Stars rating={r.rating} size={12} />
            <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
            <footer className="mt-4 text-xs text-pierre"><span className="font-semibold text-encre">{r.author}</span>, {r.city}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
