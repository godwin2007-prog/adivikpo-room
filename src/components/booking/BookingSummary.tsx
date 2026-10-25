import type { BookingData } from "../../types/booking";
import { findRoom } from "../../data/rooms";
import { formatPrice } from "../../utils/format";
import { formatDateFR } from "../../utils/dates";
import { computePrice, type PriceDetail } from "../../utils/pricing";

// Récapitulatif mis à jour en direct : chambre, dates, options, offre, total.
export default function BookingSummary({ data }: { data: BookingData }) {
  const room = findRoom(data.roomId);
  if (!room) {
    return <aside className="rounded-sm bg-white p-6 text-sm text-pierre">Choisissez une chambre pour voir le prix de votre séjour.</aside>;
  }
  const price = computePrice(room, data.checkIn, data.checkOut, data.extras);

  return (
    <aside className="overflow-hidden rounded-sm bg-white shadow-sm">
      <img src={room.images[0]} alt={room.name} className="aspect-[16/9] w-full object-cover" />
      <div className="p-6">
        <h3 className="text-2xl">{room.name}</h3>
        {price.nights > 0 && (
          <p className="mt-1 text-sm text-pierre">
            Du {formatDateFR(data.checkIn)} au {formatDateFR(data.checkOut)} · {data.guests} voyageur{data.guests > 1 ? "s" : ""}
          </p>
        )}
        <PriceLines price={price} pricePerNight={room.pricePerNight} />
        <OfferHint price={price} />
      </div>
    </aside>
  );
}

function PriceLines({ price, pricePerNight }: { price: PriceDetail; pricePerNight: number }) {
  return (
    <div className="mt-5 space-y-3 text-sm">
      <Line label={`${formatPrice(pricePerNight)} × ${price.nights} nuit${price.nights > 1 ? "s" : ""}`} value={formatPrice(price.roomTotal)} />
      {price.offerApplied && price.season && (
        <Line label={`Offre ${price.season.label.toLowerCase()} (${price.season.offer.title})`} value={`- ${formatPrice(price.discount)}`} accent />
      )}
      {price.extraLines.map((l) => <Line key={l.label} label={l.label} value={formatPrice(l.amount)} />)}
      <p className="flex justify-between border-t border-pierre/20 pt-3 text-base font-semibold text-foret">
        <span>Total</span><span>{formatPrice(price.total)}</span>
      </p>
    </div>
  );
}

function Line({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <p className={`flex justify-between gap-4 ${accent ? "text-laiton" : "text-pierre"}`}>
      <span>{label}</span><span className="whitespace-nowrap">{value}</span>
    </p>
  );
}

// Si l'offre de saison n'est pas encore atteinte, on indique combien de nuits manquent.
function OfferHint({ price }: { price: PriceDetail }) {
  if (!price.season || price.offerApplied || price.nights === 0) return null;
  const missing = price.season.offer.minNights - price.nights;
  return (
    <p className="mt-4 rounded-sm bg-laiton/10 p-3 text-xs text-encre">
      Ajoutez {missing} nuit{missing > 1 ? "s" : ""} pour profiter de l'offre {price.season.label.toLowerCase()} : {price.season.offer.title}.
    </p>
  );
}
