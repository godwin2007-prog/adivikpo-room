// Toutes les dates du site sont des chaînes "AAAA-MM-JJ" (format des <input type="date">).
// Avantage : on peut les comparer directement, "2026-11-02" < "2026-11-05".

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// "2026-11-02" -> objet Date à minuit, heure locale.
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Objet Date -> "2026-11-02".
export function toISODate(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

// addDays("2026-11-30", 2) -> "2026-12-02".
export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

// Nombre de nuits : "2026-11-02" -> "2026-11-05" donne 3.
export function countNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime();
  return Math.max(0, Math.round(diff / MS_PER_DAY));
}

// "2026-11-02" -> "2 nov."
export function formatDateFR(iso: string): string {
  return parseISODate(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
