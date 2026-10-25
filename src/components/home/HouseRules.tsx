import { houseRules } from "../../data/houseRules";
import SectionTitle from "../SectionTitle";

// La charte de la maison, acceptée ensuite lors de la réservation.
export default function HouseRules() {
  return (
    <section id="charte" className="container-site scroll-mt-20 py-24">
      <SectionTitle
        eyebrow="Voyageurs responsables"
        title="La charte de la maison"
        subtitle="Adivikpo Room accueille des voyageurs responsables. Ces quelques règles garantissent le calme de chacun."
      />
      <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {houseRules.map((rule) => (
          <li key={rule.title} className="border-l-2 border-laiton pl-5">
            <h3 className="font-texte text-base font-semibold text-encre">{rule.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-pierre">{rule.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
