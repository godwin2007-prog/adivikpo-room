import { useLocation } from "react-router-dom";

// Numéro au format international, sans "+" ni espaces (à remplacer par le vrai numéro).
const WHATSAPP_NUMBER = "2290197000000";
const MESSAGE = "Bonjour, je souhaite des informations sur Adivikpo Room.";

// Bouton flottant qui ouvre une conversation WhatsApp avec un message pré-rempli.
export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  // Sur la page d'une chambre, on remonte le bouton au-dessus de la barre "Réserver" mobile.
  const onRoomPage = useLocation().pathname.startsWith("/chambres/");

  return (
    <a href={url} target="_blank" rel="noreferrer" aria-label="Nous écrire sur WhatsApp"
      className={`fixed right-5 z-40 ${onRoomPage ? "bottom-24 lg:bottom-6" : "bottom-6"} flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z" />
      </svg>
    </a>
  );
}
