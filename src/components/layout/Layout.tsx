import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppButton from "./WhatsAppButton";

// Squelette commun à toutes les pages : <Outlet /> est remplacé
// par la page correspondant à l'URL (voir App.tsx).
export default function Layout() {
  const { pathname } = useLocation();
  // La barre est "fixed" : on décale le contenu de sa hauteur (64 px),
  // sauf sur l'accueil où la photo passe volontairement dessous.
  const offset = pathname === "/" ? "" : "pt-16";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className={offset}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
