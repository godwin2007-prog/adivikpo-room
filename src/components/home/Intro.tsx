import Reveal from "../ui/Reveal";

// Courte présentation de la maison, sous le hero.
const facts = [
  { value: "6", label: "chambres" },
  { value: "1", label: "jardin tropical" },
  { value: "22 h", label: "début du calme" },
];

export default function Intro() {
  return (
    <Reveal className="container-site grid gap-12 py-24 md:grid-cols-[1.4fr_1fr] md:items-end">
      <p className="font-titre text-2xl font-light leading-snug text-foret md:text-4xl">
        Une maison d'hôtes pensée pour se reposer : peu de chambres, un grand jardin
        et des voyageurs qui partagent le même respect du lieu.
      </p>
      <dl className="flex gap-10 md:justify-end">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="font-titre text-4xl text-laiton">{f.value}</dt>
            <dd className="mt-1 text-sm text-pierre">{f.label}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
