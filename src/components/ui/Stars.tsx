// Note en étoiles, ex. <Stars rating={4.5} /> -> ★★★★½ (5 étoiles, remplies selon la note).
export default function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`Note : ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1))); // 0 = vide, 1 = pleine
        return <Star key={i} fill={fill} size={size} />;
      })}
    </span>
  );
}

// Une étoile : le dégradé coupe l'étoile à "fill" pour les demi-notes.
function Star({ fill, size }: { fill: number; size: number }) {
  const id = `star-${Math.round(fill * 100)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className="text-laiton">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`}
        d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" />
    </svg>
  );
}
