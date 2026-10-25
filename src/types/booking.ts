export type PaymentMethod = "mtn" | "moov" | "arrivee";

// Données saisies dans le formulaire de réservation (4 étapes).
export interface BookingData {
  // Étape 1 : séjour
  roomId: string;
  checkIn: string;   // "AAAA-MM-JJ"
  checkOut: string;
  guests: number;
  // Étape 2 : options
  extras: string[];  // ids des options choisies, ex. ["navette", "diner"]
  // Étape 3 : coordonnées
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  acceptRules: boolean;
  // Étape 4 : paiement
  paymentMethod: PaymentMethod;
  paymentPhone: string;
}

// Un message d'erreur possible par champ du formulaire.
export type BookingErrors = Partial<Record<keyof BookingData, string>>;
