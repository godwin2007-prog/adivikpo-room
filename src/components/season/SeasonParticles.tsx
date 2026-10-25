import { useMemo } from "react";
import type { SeasonId } from "../../types/season";

const COUNT = 18; // nombre de particules à l'écran

// Nombre pseudo-aléatoire stable : la particule n°3 a toujours la même position.
function seeded(n: number): number {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Pétales (printemps), lueurs (été), feuilles (automne) ou neige (hiver)
// qui traversent le hero. Le style de chaque type est dans seasons.css.
export default function SeasonParticles({ season }: { season: SeasonId }) {
  const particles = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      left: `${seeded(i) * 100}%`,
      duration: `${9 + seeded(i + 50) * 9}s`,  // entre 9 et 18 secondes
      delay: `${-seeded(i + 100) * 18}s`,      // négatif : déjà en route au chargement
      scale: 0.6 + seeded(i + 150) * 0.8,
    })), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span key={i} className={`particle particle-${season}`}
          style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay, scale: `${p.scale}` }} />
      ))}
    </div>
  );
}
