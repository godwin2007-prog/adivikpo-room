import { Link } from "react-router-dom";
import type { Room } from "../../types/room";
import type { DateRange } from "../../utils/calendar";
import { computePrice } from "../../utils/pricing";
import { formatDateFR } from "../../utils/dates";
import { formatPrice } from "../../utils/format";

// Encadré de la page détail : prix, dates choisies dans le calendrier, total, bouton.
export default function BookingBox({ room, range }: { room: Room; range: DateRange }) {
  const price = computePrice(room, range.checkIn, range.checkOut);
  const hasDates = price.nights > 0;
  const query = hasDates ? `&arrivee=${range.checkIn}&depart=${range.checkOut}` : "";

  return (
    <aside id="reserver" className="rounded-sm bg-white p-7 shadow-sm">
      <p className="font-titre text-3xl text-foret">{formatPrice(room.pricePerNight)}</p>
      <p className="text-sm text-pierre">par nuit, petit-déjeuner inclus</p>

      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-sm border border-pierre/25 text-sm">
        <DateCell label="Arrivée" iso={range.checkIn} />
        <DateCell label="Départ" iso={range.checkOut} border />
      </div>

      {hasDates ? (
        <div className="mt-5 space-y-2 text-sm">
          <Row label={`${price.nights} nuit${price.nights > 1 ? "s" : ""}`} value={formatPrice(price.roomTotal)} />
          {price.offerApplied && <Row label={`Offre ${price.season?.label.toLowerCase()}`} value={`- ${formatPrice(price.discount)}`} accent />}
          <Row label="Total" value={formatPrice(price.total)} strong />
        </div>
      ) : (
        <p className="mt-5 text-sm text-pierre">Choisissez vos dates dans le calendrier.</p>
      )}

      <Link to={`/reserver?chambre=${room.id}${query}`} className="btn-primary mt-6 block text-center">
        {hasDates ? "Réserver ces dates" : "Réserver cette chambre"}
      </Link>
    </aside>
  );
}

function DateCell({ label, iso, border = false }: { label: string; iso: string; border?: boolean }) {
  return (
    <div className={`px-4 py-3 ${border ? "border-l border-pierre/25" : ""}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-pierre">{label}</p>
      <p className="mt-1">{iso ? formatDateFR(iso) : "—"}</p>
    </div>
  );
}

function Row({ label, value, accent = false, strong = false }: { label: string; value: string; accent?: boolean; strong?: boolean }) {
  const style = strong ? "border-t border-pierre/20 pt-3 font-semibold text-foret" : accent ? "text-laiton" : "text-pierre";
  return <p className={`flex justify-between ${style}`}><span>{label}</span><span>{value}</span></p>;
}
