import { useState } from "react";
import { nextRange, type DateRange } from "../../utils/calendar";
import MonthGrid from "./MonthGrid";

interface Props {
  roomId: string;
  range: DateRange;
  onChange: (range: DateRange) => void;
}

// Calendrier de disponibilité : 2 mois côte à côte (1 sur mobile).
// Jours barrés = déjà réservés. 1er clic = arrivée, 2e clic = départ.
export default function AvailabilityCalendar({ roomId, range, onChange }: Props) {
  const today = new Date();
  const [offset, setOffset] = useState(0); // 0 = mois actuel, 1 = mois suivant…
  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const second = new Date(first.getFullYear(), first.getMonth() + 1, 1);

  return (
    <div className="rounded-sm bg-white p-6">
      <div className="mb-2 flex justify-between">
        <NavButton label="Mois précédent" disabled={offset === 0} onClick={() => setOffset(offset - 1)}>←</NavButton>
        <NavButton label="Mois suivant" disabled={offset >= 11} onClick={() => setOffset(offset + 1)}>→</NavButton>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <MonthGrid year={first.getFullYear()} month={first.getMonth()} roomId={roomId} range={range}
          onSelect={(iso) => onChange(nextRange(range, iso, roomId))} />
        <div className="hidden md:block">
          <MonthGrid year={second.getFullYear()} month={second.getMonth()} roomId={roomId} range={range}
            onSelect={(iso) => onChange(nextRange(range, iso, roomId))} />
        </div>
      </div>
      <Legend onReset={() => onChange({ checkIn: "", checkOut: "" })} />
    </div>
  );
}

function NavButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick}
      className="h-9 w-9 rounded-full border border-pierre/30 text-sm disabled:opacity-30">
      {children}
    </button>
  );
}

function Legend({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-pierre/15 pt-4 text-xs text-pierre">
      <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-foret" /> Votre séjour</span>
      <span className="flex items-center gap-2"><i className="text-pierre/50 line-through">12</i> Déjà réservé</span>
      <button type="button" onClick={onReset} className="ml-auto underline hover:text-encre">Effacer les dates</button>
    </div>
  );
}
