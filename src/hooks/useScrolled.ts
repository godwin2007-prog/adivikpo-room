import { useEffect, useState } from "react";

// true dès que la page est descendue de plus de "offset" pixels.
// Sert à rendre la barre de navigation opaque quand on quitte le hero.
export function useScrolled(offset: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}
