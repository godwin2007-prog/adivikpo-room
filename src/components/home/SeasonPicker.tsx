import { seasons, seasonOrder } from "../../data/seasons";
import { useSeason } from "../../context/SeasonContext";
import SectionTitle from "../SectionTitle";

// Section "Choisissez votre saison" : 4 grandes cartes cliquables.
// Cliquer change les couleurs et le carrousel de tout le site.
export default function SeasonPicker() {
  const { season, setSeason } = useSeason();

  return (
    <section className="container-site py-16">
      <SectionTitle
        eyebrow="Saisons"
        title="Choisissez votre saison"
        subtitle="Le site prend les couleurs de la saison choisie. Chaque saison a aussi son offre, appliquée selon votre date d'arrivée."
      />
      <div role="radiogroup" aria-label="Saison" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {seasonOrder.map((id) => {
          const s = seasons[id];
          const isActive = id === season.id;
          return (
            <button key={id} role="radio" aria-checked={isActive} onClick={() => setSeason(id)}
              className={`group relative h-64 overflow-hidden rounded-sm text-left ${isActive ? "ring-2 ring-laiton ring-offset-4 ring-offset-lin" : ""}`}>
              <img src={s.heroImages[0]} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-titre text-2xl">{s.label}</p>
                <p className="mt-1 text-sm text-white/80">{s.description}</p>
                <p className="mt-3 text-xs font-semibold">{s.offer.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
