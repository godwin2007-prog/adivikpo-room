import type { BookingForm } from "../../hooks/useBookingForm";

// Boutons Retour / Continuer en bas du formulaire.
export default function BookingNav({ form }: { form: BookingForm }) {
  return (
    <div className="flex items-center justify-between border-t border-pierre/20 pt-6">
      {form.step > 0
        ? <button type="button" onClick={form.back} className="text-sm text-pierre underline hover:text-encre">← Retour</button>
        : <span />}
      <button type="submit" className="btn-primary">
        {form.isLastStep ? "Confirmer la réservation" : "Continuer"}
      </button>
    </div>
  );
}
