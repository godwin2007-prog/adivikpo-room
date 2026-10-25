import { useSearchParams } from "react-router-dom";
import { rooms } from "../data/rooms";
import { filterRooms, type SortOption } from "../utils/filterRooms";
import { formatDateFR } from "../utils/dates";
import RoomCard from "../components/rooms/RoomCard";
import RoomFilters from "../components/rooms/RoomFilters";
import SearchBar from "../components/search/SearchBar";
import PageBanner from "../components/ui/PageBanner";
import Reveal from "../components/ui/Reveal";

// Liste des chambres. Toute la recherche est dans l'URL :
// /chambres?arrivee=2026-11-02&depart=2026-11-05&voyageurs=2&prix=50000&tri=prix-asc
// Avantage : on peut partager le lien, et le bouton "retour" du navigateur fonctionne.
export default function RoomsPage() {
  const [params, setParams] = useSearchParams();
  const search = {
    checkIn: params.get("arrivee") ?? "",
    checkOut: params.get("depart") ?? "",
    guests: Number(params.get("voyageurs") ?? 1),
    maxPrice: Number(params.get("prix") ?? 0),
    sort: (params.get("tri") ?? "recommande") as SortOption,
  };
  const results = filterRooms(rooms, search);
  const hasDates = search.checkIn !== "" && search.checkOut !== "";

  // Met à jour un paramètre de l'URL sans toucher aux autres.
  function updateParam(key: "prix" | "tri", value: string) {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <>
      <PageBanner title="Les chambres" image="/images/jardins/jardin-tropical.jpg"
        subtitle="Six chambres, chacune avec sa salle de bain privée. Petit-déjeuner servi sur la terrasse." />
      <div className="container-site relative z-10 -mt-10">
        <SearchBar initialCheckIn={search.checkIn} initialCheckOut={search.checkOut} initialGuests={search.guests || 2} />
      </div>

      <section className="container-site pb-24 pt-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-pierre">
            <span className="font-semibold text-encre">{results.length} chambre{results.length > 1 ? "s" : ""}</span>
            {hasDates ? ` disponible${results.length > 1 ? "s" : ""} du ${formatDateFR(search.checkIn)} au ${formatDateFR(search.checkOut)}` : ""}
          </p>
          <RoomFilters maxPrice={search.maxPrice} sort={search.sort} onChange={updateParam} />
        </div>
        {results.length === 0 ? <EmptyState /> : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((room, i) => (
              <Reveal key={room.id} delay={(i % 3) * 0.1}>
                <RoomCard room={room} search={hasDates ? `?arrivee=${search.checkIn}&depart=${search.checkOut}` : ""} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-sm bg-white p-12 text-center">
      <h2 className="text-2xl">Aucune chambre ne correspond</h2>
      <p className="mt-2 text-pierre">Essayez d'autres dates, moins de voyageurs ou un prix plus élevé.</p>
    </div>
  );
}
