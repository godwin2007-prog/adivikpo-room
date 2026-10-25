import { useState } from "react";
import Lightbox from "./Lightbox";

interface Props {
  images: string[];
  name: string;
}

// Mosaïque : une grande photo à gauche, deux petites à droite.
// Un clic ouvre la galerie plein écran sur la photo cliquée.
export default function RoomGallery({ images, name }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null); // null = galerie fermée
  const [main, ...others] = images;

  return (
    <>
      <div className="relative grid h-[60vh] min-h-[360px] gap-2 overflow-hidden rounded-sm md:grid-cols-[2fr_1fr] md:grid-rows-2">
        <Photo src={main} alt={name} onClick={() => setOpenAt(0)} className="md:row-span-2" />
        {others.slice(0, 2).map((src, i) => (
          <Photo key={src} src={src} alt={`${name}, photo ${i + 2}`} onClick={() => setOpenAt(i + 1)} className="hidden md:block" />
        ))}
        <button onClick={() => setOpenAt(0)}
          className="absolute bottom-4 right-4 rounded-full bg-lin/95 px-4 py-2 text-sm font-medium text-foret shadow hover:bg-white">
          Voir les {images.length} photos
        </button>
      </div>
      {openAt !== null && <Lightbox images={images} startIndex={openAt} name={name} onClose={() => setOpenAt(null)} />}
    </>
  );
}

function Photo({ src, alt, onClick, className = "" }: { src: string; alt: string; onClick: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`group overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
    </button>
  );
}
