# Adivikpo Room — site de réservation de chambres d'hôtes

Frontend en **React + TypeScript + Vite**, style avec **Tailwind CSS**,
carrousels avec **Swiper**, animations avec **Framer Motion**.

## Lancer le projet

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site sur http://localhost:5173
npm run build    # version de production dans dist/
```

## Fonctionnalités

| Fonctionnalité | Où |
| --- | --- |
| 4 saisons (couleurs, photos, particules, offres) | barre de nav + accueil |
| Recherche de disponibilités (dates + voyageurs) | accueil, page Chambres |
| Filtres prix et tri | page Chambres |
| Calendrier de disponibilité (jours réservés barrés) | page d'une chambre |
| Galerie mosaïque + plein écran | page d'une chambre |
| Avis voyageurs avec notes | accueil, cartes, page d'une chambre |
| Réservation en 4 étapes : séjour, options, coordonnées, paiement | /reserver |
| Options payantes (navette, dîner…) ajoutées au total | étape 2 |
| Paiement MTN MoMo / Moov Money / à l'arrivée (simulé) | étape 4 |
| Bouton WhatsApp flottant | toutes les pages |
| Autour de la maison, charte, avis | accueil |

## Pages et URL

| URL | Page |
| --- | --- |
| `/` | Accueil |
| `/chambres?arrivee=2026-11-02&depart=2026-11-05&voyageurs=2` | Chambres disponibles à ces dates |
| `/chambres/lagune` | Détail d'une chambre |
| `/reserver?chambre=lagune&arrivee=…&depart=…` | Réservation pré-remplie |

La recherche est stockée **dans l'URL** : on peut partager le lien, et le bouton
« retour » du navigateur fonctionne.

## Organisation des fichiers

```
public/images/          photos : chambres/, salles-de-bain/, jardins/
src/
  main.tsx              point d'entrée
  App.tsx               table des routes (URL -> page)
  index.css             styles de base + classes réutilisables
  styles/seasons.css    couleurs des 4 saisons + particules
  types/                forme des données (Room, BookingData, Season)
  data/                 CONTENU : chambres, saisons, avis, options, réservations existantes, lieux
  utils/                LOGIQUE PURE (sans affichage) :
    dates.ts              calculs de dates
    availability.ts       une chambre est-elle libre ?
    calendar.ts           grille du mois, sélection arrivée/départ
    pricing.ts            prix total (nuits, offre de saison, options)
    filterRooms.ts        filtre et tri de la recherche
    validateBooking.ts    vérification de chaque étape
  hooks/
    useBookingForm.ts     état du formulaire en étapes
    useScrolled.ts        barre de nav transparente / opaque
  context/
    SeasonContext.tsx     saison choisie, partagée partout
  components/
    layout/   home/   rooms/   booking/   calendar/   search/   season/   ui/
  pages/                une page = un assemblage de composants
```

**Principe :** `data/` = le contenu, `utils/` = les calculs, `components/` = l'affichage,
`pages/` = l'assemblage. Comme en C où l'on sépare le `.h`, les fonctions et le `main`.

## Disponibilités simulées

`data/bookings.ts` contient de fausses réservations **relatives à aujourd'hui**
(ex. « la Lagune est prise de J+1 à J+4 »), pour que la démo montre toujours
des jours occupés. Avec un backend, cette liste viendrait d'une API.

## Les 4 saisons

1. `SeasonContext` garde la saison et écrit `<html data-season="hiver">`.
2. `styles/seasons.css` redéfinit les couleurs pour `[data-season="hiver"]`.
3. Tailwind lit ces variables : `bg-foret` change de couleur partout.

L'offre de saison dépend de la **date d'arrivée**, pas du thème affiché.

## Modifier le contenu

- Chambres : `src/data/rooms.ts`
- Saisons (textes, images, offres) : `src/data/seasons.ts`
- Couleurs des saisons : `src/styles/seasons.css`
- Options payantes : `src/data/extras.ts`
- Avis : `src/data/reviews.ts`
- Numéro WhatsApp : `src/components/layout/WhatsAppButton.tsx`

## Brancher un backend

Dans `src/hooks/useBookingForm.ts`, fonction `next()`, à la dernière étape :
remplacer le commentaire par un `fetch("/api/bookings", …)`.
