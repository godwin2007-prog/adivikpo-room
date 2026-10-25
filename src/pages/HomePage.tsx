import HeroCarousel from "../components/home/HeroCarousel";
import HeroSearch from "../components/home/HeroSearch";
import Intro from "../components/home/Intro";
import SeasonPicker from "../components/home/SeasonPicker";
import FeaturedRooms from "../components/home/FeaturedRooms";
import GardenCarousel from "../components/home/GardenCarousel";
import Testimonials from "../components/home/Testimonials";
import AroundHouse from "../components/home/AroundHouse";
import HouseRules from "../components/home/HouseRules";
import BookingCallout from "../components/home/BookingCallout";

// Page d'accueil : simple assemblage de sections, de haut en bas.
export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <HeroSearch />
      <Intro />
      <SeasonPicker />
      <FeaturedRooms />
      <GardenCarousel />
      <Testimonials />
      <AroundHouse />
      <HouseRules />
      <BookingCallout />
    </>
  );
}
