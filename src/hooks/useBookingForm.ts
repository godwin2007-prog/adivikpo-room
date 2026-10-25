import { useState } from "react";
import type { BookingData, BookingErrors } from "../types/booking";
import { validateStep } from "../utils/validateBooking";

export const BOOKING_STEPS = ["Séjour", "Options", "Coordonnées", "Paiement"];
const LAST_STEP = BOOKING_STEPS.length - 1;

const emptyBooking: BookingData = {
  roomId: "", checkIn: "", checkOut: "", guests: 1,
  extras: [],
  firstName: "", lastName: "", email: "", phone: "", message: "", acceptRules: false,
  paymentMethod: "mtn", paymentPhone: "",
};

// Référence de réservation lisible, ex. "ADV-K4Q9ZT".
function makeReference(): string {
  return "ADV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// Toute la logique du formulaire en étapes. La page ne fait qu'afficher.
// "initial" permet de pré-remplir depuis l'URL (chambre, dates, voyageurs).
export function useBookingForm(initial: Partial<BookingData>) {
  const [data, setData] = useState<BookingData>({ ...emptyBooking, ...initial });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);

  // Met à jour un champ et efface son erreur. Ex. updateField("email", "a@b.com").
  function updateField<K extends keyof BookingData>(field: K, value: BookingData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  // Ajoute l'option si absente, la retire si déjà choisie.
  function toggleExtra(id: string) {
    const has = data.extras.includes(id);
    updateField("extras", has ? data.extras.filter((e) => e !== id) : [...data.extras, id]);
  }

  // Valide l'étape en cours, puis passe à la suivante (ou termine).
  function next() {
    const found = validateStep(step, data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Dernière étape : ici on enverrait les données au backend (fetch POST /api/bookings).
    if (step === LAST_STEP) setReference(makeReference());
    else setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  return { data, errors, step, reference, isLastStep: step === LAST_STEP, updateField, toggleExtra, next, back };
}

// Type pratique pour les composants d'étape qui reçoivent le formulaire.
export type BookingForm = ReturnType<typeof useBookingForm>;
