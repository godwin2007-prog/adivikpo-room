import { seasons, seasonOrder } from "../../data/seasons";
import { useSeason } from "../../context/SeasonContext";

// Sélecteur compact de la barre de navigation.
// "light" = texte clair, utilisé quand la barre est transparente sur le hero.
export default function SeasonSwitcher({ light = false }: { light?: boolean }) {
  const { season, setSeason } = useSeason();
  const idle = light ? "text-lin/75 hover:text-lin" : "text-pierre hover:text-encre";
  const active = light ? "bg-lin text-foret" : "bg-foret text-lin";

  return (
    <div role="radiogroup" aria-label="Saison du site"
      className={`flex rounded-full border p-1 ${light ? "border-lin/30" : "border-pierre/25"}`}>
      {seasonOrder.map((id) => (
        <button key={id} role="radio" aria-checked={id === season.id} onClick={() => setSeason(id)}
          className={`rounded-full px-3 py-1 text-xs transition ${id === season.id ? active : idle}`}>
          {seasons[id].label}
        </button>
      ))}
    </div>
  );
}
