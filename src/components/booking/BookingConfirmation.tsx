import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { BookingData } from "../../types/booking";
import { findRoom } from "../../data/rooms";
import { formatDateFR } from "../../utils/dates";
import { formatPrice } from "../../utils/format";
import { computePrice } from "../../utils/pricing";

const paymentLabels = { mtn: "MTN MoMo", moov: "Moov Money", arrivee: "à l'arrivée" };

// Écran affiché après une réservation valide, avec sa référence.
export default function BookingConfirmation({ data, reference }: { data: BookingData; reference: string }) {
  const room = findRoom(data.roomId)!; // la validation garantit que la chambre existe
  const price = computePrice(room, data.checkIn, data.checkOut, data.extras);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl overflow-hidden rounded-sm bg-white text-center shadow-sm">
      <img src={room.images[0]} alt="" className="aspect-[16/7] w-full object-cover" />
      <div className="p-10">
        <p className="eyebrow">Réservation enregistrée</p>
        <h2 className="mt-3 text-4xl">Merci {data.firstName} !</h2>
        <p className="mt-4 leading-relaxed text-pierre">
          {room.name}, du {formatDateFR(data.checkIn)} au {formatDateFR(data.checkOut)}
          <br />Total : <strong className="text-foret">{formatPrice(price.total)}</strong>, paiement {paymentLabels[data.paymentMethod]}.
          Un e-mail de confirmation part à {data.email}.
        </p>
        <p className="mt-6 inline-block rounded-full bg-lin px-5 py-2 font-mono text-sm tracking-wider">{reference}</p>
        <div><Link to="/" className="btn-primary mt-8">Retour à l'accueil</Link></div>
      </div>
    </motion.div>
  );
}
