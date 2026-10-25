import { Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import RoomCard from "../rooms/RoomCard";
import SectionTitle from "../SectionTitle";
import Reveal from "../ui/Reveal";

// Affiche 3 chambres sur l'accueil, avec un lien vers toutes les chambres.
export default function FeaturedRooms() {
  const featured = rooms.slice(0, 3);

  return (
    <section className="container-site py-12">
      <SectionTitle
        eyebrow="Les chambres"
        title="Six chambres, six ambiances"
        subtitle="Chaque chambre a sa propre salle de bain et une ambiance différente."
      />
      <div className="grid gap-10 md:grid-cols-3">
        {featured.map((room, i) => (
          <Reveal key={room.id} delay={i * 0.12}>
            <RoomCard room={room} />
          </Reveal>
        ))}
      </div>
      <Link to="/chambres" className="mt-10 inline-block text-sm text-lagune underline underline-offset-4 hover:text-laiton">
        Voir les {rooms.length} chambres
      </Link>
    </section>
  );
}
