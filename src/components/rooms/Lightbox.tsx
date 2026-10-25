import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: string[];
  startIndex: number;
  name: string;
  onClose: () => void;
}

// Galerie plein écran. Se ferme avec Échap ou le bouton ×.
export default function Lightbox({ images, startIndex, name, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // bloque le défilement de la page derrière
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Photos : ${name}`} className="fixed inset-0 z-[100] flex flex-col bg-black/95">
      <button onClick={onClose} aria-label="Fermer" className="absolute right-5 top-4 z-10 text-4xl leading-none text-white/80 hover:text-white">×</button>
      <Swiper modules={[Navigation, Keyboard, Pagination]} initialSlide={startIndex} navigation keyboard
        pagination={{ type: "fraction" }} className="h-full w-full text-white">
        {images.map((src, i) => (
          <SwiperSlide key={src} className="!flex items-center justify-center p-6 md:p-16">
            <img src={src} alt={`${name}, photo ${i + 1}`} className="max-h-full max-w-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
