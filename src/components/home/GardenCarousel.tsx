import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { gardenSlides } from "../../data/gardenSlides";

// Carrousel du jardin : on voit une image entière et le bord de la suivante,
// ce qui invite à faire glisser.
export default function GardenCarousel() {
  return (
    <section className="bg-foret py-20 text-lin">
      <div className="container-site">
        <h2 className="text-3xl text-lin md:text-4xl">Le jardin</h2>
        <p className="mt-3 max-w-xl text-lin/75">
          Glycine, palmiers et une terrasse ombragée où l'on prend le petit-déjeuner.
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{ 768: { slidesPerView: 2.2, spaceBetween: 28 } }}
        className="container-site mt-10"
      >
        {gardenSlides.map((slide) => (
          <SwiperSlide key={slide.src}>
            <figure>
              <img src={slide.src} alt={slide.caption} className="h-[420px] w-full rounded-sm object-cover" />
              <figcaption className="mt-3 text-sm text-lin/70">{slide.caption}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
