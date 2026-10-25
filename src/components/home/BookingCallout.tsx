import { Link } from "react-router-dom";

// Dernier appel à réserver, en bas de l'accueil.
export default function BookingCallout() {
  return (
    <section className="relative overflow-hidden">
      <img src="/images/jardins/terrasse.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-foret/80" />
      <div className="container-site relative py-24 text-center text-lin">
        <h2 className="mx-auto max-w-2xl text-4xl text-lin md:text-5xl">Votre chambre vous attend au calme</h2>
        <p className="mx-auto mt-4 max-w-md text-lin/80">Réservation en quelques minutes, paiement par mobile money ou à l'arrivée.</p>
        <Link to="/reserver" className="btn-primary mt-8 bg-laiton hover:bg-lin hover:text-foret">Réserver un séjour</Link>
      </div>
    </section>
  );
}
