import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SeasonSwitcher from "../season/SeasonSwitcher";
import { useScrolled } from "../../hooks/useScrolled";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/chambres", label: "Chambres" },
];

// Transparente sur le haut de l'accueil (par-dessus la photo), opaque ailleurs.
export default function Navbar() {
  const [open, setOpen] = useState(false); // menu mobile
  const { pathname } = useLocation();
  const scrolled = useScrolled(40);
  const transparent = pathname === "/" && !scrolled && !open;

  const bar = transparent ? "bg-transparent text-lin" : "bg-lin/95 text-encre shadow-sm backdrop-blur";
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition hover:text-laiton ${isActive ? "text-laiton" : ""}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bar}`}>
      <nav className="container-site flex h-16 items-center justify-between">
        <Link to="/" className={`font-titre text-xl ${transparent ? "text-lin" : "text-foret"}`}>Adivikpo Room</Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={linkClass}>{l.label}</NavLink>)}
          <SeasonSwitcher light={transparent} />
          <Link to="/reserver" className={transparent ? "btn-outline" : "btn-primary"}>Réserver</Link>
        </div>

        <button className="text-sm lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Fermer" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="container-site flex flex-col items-start gap-4 pb-5 lg:hidden">
          <SeasonSwitcher />
          {links.map((l) => <NavLink key={l.to} to={l.to} end className={linkClass} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
          <Link to="/reserver" className="btn-primary self-stretch text-center" onClick={() => setOpen(false)}>Réserver</Link>
        </div>
      )}
    </header>
  );
}
