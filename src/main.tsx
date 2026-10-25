import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SeasonProvider } from "./context/SeasonContext";
import "./index.css";
import "./styles/seasons.css";

// Point d'entrée : React s'accroche à la <div id="root"> de index.html.
// SeasonProvider entoure toute l'application pour partager la saison choisie.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SeasonProvider>
        <App />
      </SeasonProvider>
    </BrowserRouter>
  </React.StrictMode>
);
