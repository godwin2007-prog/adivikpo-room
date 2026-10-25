import SearchBar from "../search/SearchBar";

// Barre de recherche qui chevauche le bas du hero.
export default function HeroSearch() {
  return (
    <div className="container-site relative z-30 -mt-12">
      <SearchBar />
    </div>
  );
}
