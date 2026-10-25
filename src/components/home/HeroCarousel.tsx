import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { useSeason } from "../../context/SeasonContext";
import SeasonParticles from "../season/SeasonParticles";

// Hero de l'accueil : les images, le texte et les particules
// changent selon la saison choisie par le visiteur.
export default function HeroCarousel() {
  const { season } = useSeason();

  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden">
      {/* key sur la div : React remplace tout le carrousel
          quand la saison change, pour repartir des nouvelles images */}
      <div key={`slides-${season.id}`} className="h-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {season.heroImages.map((src) => (
            <SwiperSlide key={src}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Voile sombre en bas, teinté par la couleur de la saison */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-foret/85 via-foret/20 to-transparent" />
      <SeasonParticles key={`particles-${season.id}`} season={season.id} />
      <HeroText text={season.heroText} />
    </section>
  );
}

// Titre fixe, phrase qui change en fondu à chaque saison.
function HeroText({ text }: { text: string }) {
  return (
    <div className="container-site absolute inset-x-0 bottom-28 z-20 text-lin md:bottom-32">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-lin/80">
        Maison d'hôtes · Cotonou
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-titre text-5xl font-light leading-none text-lin md:text-8xl"
      >
        Adivikpo Room
      </motion.h1>
      <AnimatePresence mode="wait">
        <motion.p key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }} className="mt-5 max-w-md text-base leading-relaxed text-lin/85 md:text-lg">
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
