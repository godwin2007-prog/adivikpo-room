import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { findRoom } from "../data/rooms";
import { getRoomRating } from "../utils/reviews";
import type { DateRange } from "../utils/calendar";
import RoomGallery from "../components/rooms/RoomGallery";
import RoomFacts from "../components/rooms/RoomFacts";
import RoomReviews from "../components/rooms/RoomReviews";
import BookingBox from "../components/rooms/BookingBox";
import MobileBookingBar from "../components/rooms/MobileBookingBar";
import AvailabilityCalendar from "../components/calendar/AvailabilityCalendar";
import Stars from "../components/ui/Stars";
import NotFoundPage from "./NotFoundPage";

// Page d'une chambre. L'id vient de l'URL : /chambres/lagune -> id = "lagune".
// Les dates peuvent venir de la recherche : /chambres/lagune?arrivee=…&depart=…
export default function RoomDetailPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [range, setRange] = useState<DateRange>({
    checkIn: params.get("arrivee") ?? "",
    checkOut: params.get("depart") ?? "",
  });
  const room = findRoom(id);

  if (!room) return <NotFoundPage />;
  const { average, count } = getRoomRating(room.id);

  return (
    <article className="container-site pb-28 pt-10 lg:pb-24">
      <Link to="/chambres" className="text-sm text-lagune hover:text-laiton">← Toutes les chambres</Link>
      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl">{room.name}</h1>
          <p className="mt-2 text-pierre">{room.tagline}</p>
        </div>
        {count > 0 && <p className="flex items-center gap-2 text-sm"><Stars rating={average} /> {average.toLocaleString("fr-FR")} · {count} avis</p>}
      </header>

      <div className="mt-8"><RoomGallery images={room.images} name={room.name} /></div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-14">
          <section>
            <p className="max-w-prose text-lg leading-relaxed">{room.description}</p>
            <div className="mt-8"><RoomFacts room={room} /></div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {room.amenities.map((a) => <li key={a} className="rounded-full border border-pierre/30 px-4 py-1.5 text-sm">{a}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="mb-6 text-3xl">Disponibilités</h2>
            <AvailabilityCalendar roomId={room.id} range={range} onChange={setRange} />
          </section>
          <RoomReviews roomId={room.id} />
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit"><BookingBox room={room} range={range} /></div>
      </div>
      <MobileBookingBar room={room} />
    </article>
  );
}
