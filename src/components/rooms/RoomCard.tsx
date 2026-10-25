import { Link } from "react-router-dom";
import type { Room } from "../../types/room";
import { formatPrice } from "../../utils/format";
import { getRoomRating } from "../../utils/reviews";
import Stars from "../ui/Stars";

interface Props {
  room: Room;
  search?: string; // ex. "?arrivee=…&depart=…" pour garder les dates jusqu'à la page détail
}

// Carte d'une chambre : photo, note, nom, infos et prix. Toute la carte est cliquable.
export default function RoomCard({ room, search = "" }: Props) {
  const { average, count } = getRoomRating(room.id);

  return (
    <Link to={`/chambres/${room.id}${search}`} className="group block">
      <div className="relative overflow-hidden rounded-sm">
        <img src={room.images[0]} alt={room.name}
          className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-lin/90 px-3 py-1 text-xs font-medium text-foret backdrop-blur">
          {room.size} m² · {room.capacity} pers.
        </span>
        <span className="absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-foret/90 py-2.5 text-center text-sm text-lin opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Découvrir la chambre
        </span>
      </div>
      {count > 0 && (
        <p className="mt-5 flex items-center gap-2 text-xs text-pierre">
          <Stars rating={average} size={12} /> {average.toLocaleString("fr-FR")} · {count} avis
        </p>
      )}
      <h3 className="mt-2 text-2xl">{room.name}</h3>
      <p className="mt-1 text-sm text-pierre">{room.tagline}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold text-foret">{formatPrice(room.pricePerNight)}</span>
        <span className="text-pierre"> / nuit</span>
      </p>
    </Link>
  );
}
