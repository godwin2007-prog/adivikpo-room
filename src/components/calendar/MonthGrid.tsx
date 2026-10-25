import { getMonthCells, isSelectable, type DateRange } from "../../utils/calendar";
import { isDateBooked } from "../../utils/availability";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

interface Props {
  year: number;
  month: number; // 0 = janvier
  roomId: string;
  range: DateRange;
  onSelect: (iso: string) => void;
}

// Un mois du calendrier : titre, jours de la semaine, puis les jours.
export default function MonthGrid({ year, month, roomId, range, onSelect }: Props) {
  const title = new Date(year, month, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div>
      <p className="mb-4 text-center font-titre text-lg capitalize">{title}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {WEEKDAYS.map((d, i) => <span key={i} className="pb-2 text-xs text-pierre">{d}</span>)}
        {getMonthCells(year, month).map((iso, i) =>
          iso ? <Day key={iso} iso={iso} roomId={roomId} range={range} onSelect={onSelect} /> : <span key={`vide-${i}`} />
        )}
      </div>
    </div>
  );
}

// Choisit le style d'un jour selon son état.
function dayStyle(iso: string, roomId: string, range: DateRange, selectable: boolean): string {
  const { checkIn, checkOut } = range;
  if (iso === checkIn || iso === checkOut) return "bg-foret text-lin rounded-full";
  if (checkIn && checkOut && iso > checkIn && iso < checkOut) return "bg-laiton/15 text-encre";
  if (!selectable && isDateBooked(roomId, iso)) return "text-pierre/40 line-through";
  if (!selectable) return "text-pierre/30";
  return "rounded-full hover:bg-foret/10";
}

function Day({ iso, roomId, range, onSelect }: { iso: string; roomId: string; range: DateRange; onSelect: (iso: string) => void }) {
  const selectable = isSelectable(roomId, iso, range);
  return (
    <button type="button" disabled={!selectable} onClick={() => onSelect(iso)}
      className={`mx-auto h-10 w-full transition disabled:cursor-not-allowed ${dayStyle(iso, roomId, range, selectable)}`}>
      {Number(iso.slice(8))}
    </button>
  );
}
