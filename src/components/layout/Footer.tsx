import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foret text-lin/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-titre text-2xl text-lin">Adivikpo Room</p>
          <p className="mt-3 max-w-xs text-sm">Chambres d'hôtes au calme, avec jardin, à Cotonou.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-lin">Contact</p>
          <p>+229 01 97 00 00 00</p>
          <p>contact@adivikpo-room.bj</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-1 text-lin">Navigation</p>
          <Link to="/chambres" className="hover:text-laiton">Les chambres</Link>
          <Link to="/reserver" className="hover:text-laiton">Réserver un séjour</Link>
        </div>
      </div>
      <p className="border-t border-lin/10 py-5 text-center text-xs text-lin/50">
        © {new Date().getFullYear()} Adivikpo Room
      </p>
    </footer>
  );
}
