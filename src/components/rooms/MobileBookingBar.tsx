import type { Room } from "../../types/room";
import { formatPrice } from "../../utils/format";

// Barre fixée en bas de l'écran sur mobile, qui fait défiler jusqu'à l'encadré de réservation.
export default function MobileBookingBar({ room }: { room: Room }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-pierre/20 bg-lin/95 px-5 py-3 backdrop-blur lg:hidden">
      <p className="text-sm"><span className="font-semibold text-foret">{formatPrice(room.pricePerNight)}</span> / nuit</p>
      <a href="#reserver" className="btn-primary py-2.5">Réserver</a>
    </div>
  );
}
