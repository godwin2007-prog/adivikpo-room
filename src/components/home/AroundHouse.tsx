import { places } from "../../data/places";
import Reveal from "../ui/Reveal";

// "Autour de la maison" : lieux à visiter et temps de trajet.
export default function AroundHouse() {
  return (
    <section className="container-site grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr]">
      <Reveal>
        <p className="eyebrow">Explorer</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Autour de la maison</h2>
        <p className="mt-4 max-w-sm leading-relaxed text-pierre">
          Au calme, mais à quelques minutes de la mer, des marchés et des grands sites du sud du Bénin.
        </p>
        <img src="/images/jardins/allee-glycine.jpg" alt="" className="mt-8 hidden aspect-[4/3] w-full rounded-sm object-cover lg:block" />
      </Reveal>
      <ul className="divide-y divide-pierre/20 border-y border-pierre/20">
        {places.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <li className="flex items-baseline justify-between gap-6 py-6">
              <div>
                <h3 className="font-titre text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-pierre">{p.text}</p>
              </div>
              <span className="whitespace-nowrap font-titre text-xl text-laiton">{p.time}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
