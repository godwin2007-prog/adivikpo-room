/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Les couleurs viennent de variables CSS définies dans index.css.
        // Chaque saison redéfinit ces variables : tout le site change de couleur
        // sans toucher aux composants. "<alpha-value>" garde les opacités (bg-foret/85).
        foret: "rgb(var(--c-foret) / <alpha-value>)",   // couleur principale foncée
        lagune: "rgb(var(--c-lagune) / <alpha-value>)", // liens, détails
        laiton: "rgb(var(--c-laiton) / <alpha-value>)", // accent : boutons, chiffres
        lin: "rgb(var(--c-lin) / <alpha-value>)",       // fond clair
        encre: "rgb(var(--c-encre) / <alpha-value>)",   // texte principal
        pierre: "rgb(var(--c-pierre) / <alpha-value>)", // texte secondaire
      },
      fontFamily: {
        titre: ['"Fraunces"', "Georgia", "serif"],
        texte: ['"Manrope"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
