import type { SortOption } from "../../utils/filterRooms";

interface Props {
  maxPrice: number;
  sort: SortOption;
  onChange: (key: "prix" | "tri", value: string) => void;
}

const priceOptions = [
  { value: 0, label: "Tous les prix" },
  { value: 40000, label: "Jusqu'à 40 000 FCFA" },
  { value: 50000, label: "Jusqu'à 50 000 FCFA" },
  { value: 60000, label: "Jusqu'à 60 000 FCFA" },
];

// Filtre de prix et tri, au-dessus de la liste des chambres.
export default function RoomFilters({ maxPrice, sort, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <select aria-label="Prix maximum" value={maxPrice} onChange={(e) => onChange("prix", e.target.value)} className="filter-select">
        {priceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <select aria-label="Trier" value={sort} onChange={(e) => onChange("tri", e.target.value)} className="filter-select">
        <option value="recommande">Recommandées</option>
        <option value="prix-asc">Prix croissant</option>
        <option value="prix-desc">Prix décroissant</option>
      </select>
    </div>
  );
}
