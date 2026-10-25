import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, todayISO } from "../../utils/dates";

interface Props {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

// Barre "Arrivée / Départ / Voyageurs". Envoie vers /chambres avec la recherche
// dans l'URL, ex. /chambres?arrivee=2026-11-02&depart=2026-11-05&voyageurs=2
export default function SearchBar({ initialCheckIn = "", initialCheckOut = "", initialGuests = 2 }: Props) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ voyageurs: String(guests) });
    if (checkIn && checkOut > checkIn) {
      params.set("arrivee", checkIn);
      params.set("depart", checkOut);
    }
    navigate(`/chambres?${params}`);
  }

  // Si on choisit une arrivée après le départ, on pousse le départ au lendemain.
  function changeCheckIn(value: string) {
    setCheckIn(value);
    if (value && checkOut <= value) setCheckOut(addDays(value, 1));
  }

  return (
    <form onSubmit={handleSubmit}
      className="grid gap-px overflow-hidden rounded-sm bg-pierre/15 shadow-xl md:grid-cols-[1fr_1fr_0.7fr_auto]">
      <Field label="Arrivée">
        <input type="date" min={todayISO()} value={checkIn} onChange={(e) => changeCheckIn(e.target.value)} className="search-input" />
      </Field>
      <Field label="Départ">
        <input type="date" min={checkIn ? addDays(checkIn, 1) : todayISO()} value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)} className="search-input" />
      </Field>
      <Field label="Voyageurs">
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="search-input">
          {[1, 2, 3].map((n) => <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>)}
        </select>
      </Field>
      <button type="submit" className="bg-foret px-8 py-5 text-sm font-medium text-lin transition hover:bg-laiton">
        Voir les disponibilités
      </button>
    </form>
  );
}

// Case blanche avec un petit libellé au-dessus du champ.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col bg-white px-5 py-3">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-pierre">{label}</span>
      {children}
    </label>
  );
}
