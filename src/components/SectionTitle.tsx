import Reveal from "./ui/Reveal";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string; // petit mot en capitales au-dessus du titre
}

// Titre de section réutilisé sur toutes les pages, avec apparition au défilement.
export default function SectionTitle({ title, subtitle, eyebrow }: Props) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 leading-relaxed text-pierre">{subtitle}</p>}
    </Reveal>
  );
}
