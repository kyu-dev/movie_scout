# 🎬 Movie Scout

**Movie Scout** est une application web moderne permettant de découvrir, rechercher et gérer vos films favoris grâce à l'API TMDB. Profitez d'une interface élégante, d'une navigation fluide et de nombreuses fonctionnalités pour les cinéphiles.

---

## 📑 Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Structure du projet](#structure-du-projet)
3. [Guide d'installation](#guide-dinstallation)
4. [Technologies utilisées](#technologies-utilisées)
5. [Roadmap](#roadmap)
6. [Contribuer](#contribuer)
7. [Contact](#contact)

---

## ✨ Fonctionnalités

- Recherche de films par titre (API TMDB)
- Affichage des films populaires, mieux notés, par genre et recommandations personnalisées
- Détail complet d'un film : synopsis, genres, durée, casting, trailer YouTube intégré
- Gestion des favoris (ajout/suppression, persistance locale)
- Navigation fluide entre les pages (Accueil, Favoris, Détails)
- Interface responsive et moderne (UI/UX soignée)
- Skeletons et loaders pour une expérience utilisateur optimale

---

## 🗂️ Structure du projet

```
movie_scout/
│
├── src/
│   ├── api/                # Gestion des appels à l'API TMDB
│   │   └── api.js
│   ├── assets/             # Images et logos
│   │   ├── ui/             # Composants UI réutilisables (boutons, badge, carousel, etc.)
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   └── ...
│   ├── lib/                # Fonctions utilitaires
│   │   └── utils.js
│   ├── pages/              # Pages principales (Accueil, Favoris, Détails)
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   └── MovieDetails.jsx
│   ├── store/              # Gestion d'état globale (Zustand)
│   │   ├── store.js
│   │   └── slices/
│   │       ├── favoritesSlice.js
│   │       ├── movieSlice.js
│   │       ├── searchSlice.js
│   │       └── uiSlice.js
│   ├── styles/             # Fichiers de style (CSS/Tailwind)
│   │   └── main.css
│   └── main.jsx            # Point d'entrée de l'application
│
├── public/                 # Fichiers statiques (si besoin)
├── package.json            # Dépendances et scripts
├── README.md               # Documentation
└── ...
```

---

## 🚀 Guide d'installation

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-repo>
   cd movie_scout
   ```

2. **Installer les dépendances**

   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```

3. **Configurer l'API TMDB**

   - Créez un fichier `.env` à la racine du projet avec :
     ```
     VITE_TMDB_API_KEY=VOTRE_CLE_API_TMDB
     ```

4. **Lancer le projet en développement**

   ```bash
   pnpm dev
   # ou
   npm run dev
   # ou
   yarn dev
   ```

5. **Accéder à l'application**
   - Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 🗺️ Roadmap

- [x] Recherche et affichage des films
- [x] Gestion des favoris
- [x] Détail complet d'un film (casting, trailer, genres…)
- [x] Carrousels dynamiques (populaires, mieux notés, recommandations)
- [x] UI responsive et animations
- [x] Déploiement Vercel

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

## 📬 Contact

- Twitter : [@V0_Arthur](https://x.com/V0_Arthur)
- GitHub : [kyu-dev](https://github.com/kyu-dev)
- Email : contact@example.com

---
