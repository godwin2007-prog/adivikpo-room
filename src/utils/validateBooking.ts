import type { BookingData, BookingErrors } from "../types/booking";
import { findRoom } from "../data/rooms";
import { countNights, todayISO } from "./dates";
import { isRoomAvailable } from "./availability";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{8,15}$/;

// On retire les espaces avant de tester : "+229 01 97 00 00 00" -> "+2290197000000".
function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value.replace(/\s/g, ""));
}

// Étape 1 : chambre, dates, voyageurs, disponibilité.
function validateStay(data: BookingData, errors: BookingErrors) {
  const room = findRoom(data.roomId);
  if (!room) errors.roomId = "Choisissez une chambre.";
  if (!data.checkIn || data.checkIn < todayISO()) errors.checkIn = "Choisissez une date d'arrivée à venir.";
  if (countNights(data.checkIn, data.checkOut) < 1) errors.checkOut = "Le départ doit être après l'arrivée.";
  else if (room && !isRoomAvailable(room.id, data.checkIn, data.checkOut))
    errors.checkOut = "Cette chambre est déjà réservée sur une partie de ces dates.";
  if (data.guests < 1) errors.guests = "Au moins un voyageur.";
  else if (room && data.guests > room.capacity) errors.guests = `Cette chambre accueille ${room.capacity} personnes au maximum.`;
}

// Étape 3 : coordonnées et charte.
function validateContact(data: BookingData, errors: BookingErrors) {
  if (!data.firstName.trim()) errors.firstName = "Indiquez votre prénom.";
  if (!data.lastName.trim()) errors.lastName = "Indiquez votre nom.";
  if (!EMAIL_REGEX.test(data.email)) errors.email = "Adresse e-mail invalide, ex. nom@mail.com";
  if (!isValidPhone(data.phone)) errors.phone = "Numéro invalide, ex. +229 01 97 00 00 00";
  if (!data.acceptRules) errors.acceptRules = "Acceptez la charte de la maison pour réserver.";
}

// Étape 4 : numéro obligatoire seulement pour le mobile money.
function validatePayment(data: BookingData, errors: BookingErrors) {
  if (data.paymentMethod !== "arrivee" && !isValidPhone(data.paymentPhone))
    errors.paymentPhone = "Numéro mobile money invalide.";
}

// Vérifie seulement les champs de l'étape en cours (0 à 3).
// L'étape 2 (options) n'a rien d'obligatoire.
export function validateStep(step: number, data: BookingData): BookingErrors {
  const errors: BookingErrors = {};
  if (step === 0) validateStay(data, errors);
  if (step === 2) validateContact(data, errors);
  if (step === 3) validatePayment(data, errors);
  return errors;
}
