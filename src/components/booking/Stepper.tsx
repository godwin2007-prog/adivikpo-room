import { BOOKING_STEPS } from "../../hooks/useBookingForm";

// Barre de progression : étapes passées cochées, étape en cours mise en avant.
export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 text-sm">
      {BOOKING_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition
              ${active ? "bg-foret text-lin" : done ? "bg-laiton text-white" : "border border-pierre/30 text-pierre"}`}>
              {done ? "✓" : i + 1}
            </span>
            <span className={`hidden sm:inline ${active ? "font-medium text-encre" : "text-pierre"}`}>{label}</span>
            {i < BOOKING_STEPS.length - 1 && <span className={`h-px flex-1 ${done ? "bg-laiton" : "bg-pierre/25"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
