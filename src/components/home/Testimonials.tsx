import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { reviews } from "../../data/reviews";
import { findRoom } from "../../data/rooms";
import Stars from "../ui/Stars";
import Reveal from "../ui/Reveal";

// Carrousel d'avis : 1 avis visible sur mobile, 2 sur ordinateur.
export default function Testimonials() {
  return (
    <section className="container-site py-24">
      <Reveal>
        <p className="eyebrow">Ils sont venus</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Ce que disent nos hôtes</h2>
      </Reveal>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 6000 }} pagination={{ clickable: true }}
        spaceBetween={28} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }} className="gallery mt-10 !pb-12">
        {reviews.map((r) => (
          <SwiperSlide key={r.author} className="!h-auto">
            <blockquote className="flex h-full flex-col rounded-sm bg-white p-8">
              <Stars rating={r.rating} />
              <p className="mt-5 flex-1 font-titre text-xl font-light leading-relaxed text-foret">« {r.text} »</p>
              <footer className="mt-6 text-sm text-pierre">
                <span className="font-semibold text-encre">{r.author}</span>, {r.city} · {findRoom(r.roomId)?.name}
              </footer>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
