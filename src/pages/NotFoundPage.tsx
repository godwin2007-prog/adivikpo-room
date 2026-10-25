import { Link } from "react-router-dom";

// Affichée pour une URL inconnue ou une chambre qui n'existe pas.
export default function NotFoundPage() {
  return (
    <section className="container-site py-32 text-center">
      <h1 className="text-4xl">Page introuvable</h1>
      <p className="mt-4 text-pierre">Cette page n'existe pas ou a été déplacée.</p>
      <Link to="/chambres" className="btn-primary mt-8">Voir les chambres</Link>
    </section>
  );
}
