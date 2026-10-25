import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookingForm } from "../hooks/useBookingForm";
import Stepper from "../components/booking/Stepper";
import StayStep from "../components/booking/StayStep";
import ExtrasStep from "../components/booking/ExtrasStep";
import ContactStep from "../components/booking/ContactStep";
import PaymentStep from "../components/booking/PaymentStep";
import BookingNav from "../components/booking/BookingNav";
import BookingSummary from "../components/booking/BookingSummary";
import BookingConfirmation from "../components/booking/BookingConfirmation";
import PageBanner from "../components/ui/PageBanner";

// Une étape = un composant. L'index correspond à form.step (0 à 3).
const steps = [StayStep, ExtrasStep, ContactStep, PaymentStep];

// Réservation en 4 étapes. Pré-remplie depuis l'URL :
// /reserver?chambre=lagune&arrivee=2026-11-02&depart=2026-11-05
export default function BookingPage() {
  const [params] = useSearchParams();
  const form = useBookingForm({
    roomId: params.get("chambre") ?? "",
    checkIn: params.get("arrivee") ?? "",
    checkOut: params.get("depart") ?? "",
  });

  if (form.reference) {
    return <section className="container-site py-20"><BookingConfirmation data={form.data} reference={form.reference} /></section>;
  }

  const CurrentStep = steps[form.step];
  function handleSubmit(e: FormEvent) {
    e.preventDefault(); // empêche le rechargement de la page
    form.next();
  }

  return (
    <>
      <PageBanner title="Réserver un séjour" image="/images/jardins/terrasse.jpg" />
      <section className="container-site pb-24 pt-12">
        <Stepper current={form.step} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            <CurrentStep form={form} />
            <BookingNav form={form} />
          </form>
          <div className="lg:sticky lg:top-24 lg:h-fit"><BookingSummary data={form.data} /></div>
        </div>
      </section>
    </>
  );
}
