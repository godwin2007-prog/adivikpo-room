import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Season, SeasonId } from "../types/season";
import { seasons } from "../data/seasons";
import { getSeasonFromDate } from "../utils/season";

const STORAGE_KEY = "adivikpo-season";

interface SeasonContextValue {
  season: Season;
  setSeason: (id: SeasonId) => void;
}

// Le "contexte" rend la saison accessible à tous les composants,
// sans la passer en props de parent en enfant.
const SeasonContext = createContext<SeasonContextValue | null>(null);

// Saison au chargement : celle choisie la dernière fois, sinon celle d'aujourd'hui.
function initialSeason(): SeasonId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in seasons) return saved as SeasonId;
  } catch {
    // localStorage indisponible (navigation privée) : on ignore
  }
  return getSeasonFromDate(new Date());
}

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [seasonId, setSeasonId] = useState<SeasonId>(initialSeason);

  // À chaque changement : <html data-season="automne"> -> index.css change les couleurs.
  useEffect(() => {
    document.documentElement.dataset.season = seasonId;
    try { localStorage.setItem(STORAGE_KEY, seasonId); } catch { /* ignoré */ }
  }, [seasonId]);

  return (
    <SeasonContext.Provider value={{ season: seasons[seasonId], setSeason: setSeasonId }}>
      {children}
    </SeasonContext.Provider>
  );
}

// Utilisation dans un composant : const { season, setSeason } = useSeason();
export function useSeason(): SeasonContextValue {
  const value = useContext(SeasonContext);
  if (!value) throw new Error("useSeason doit être utilisé dans <SeasonProvider>");
  return value;
}
