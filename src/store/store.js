import { create } from "zustand";
import { createMovieSlice } from "./slices/movieSlice";
import { createSearchSlice } from "./slices/searchSlice";
import { createFavoritesSlice } from "./slices/favoritesSlice";
import { createUiSlice } from "./slices/uiSlice";
import { persist } from "zustand/middleware";

// Création du store principal qui combine tous les slices
export const useStore = create(
  persist(
    (set, get) => ({
      ...createMovieSlice(set, get),
      ...createSearchSlice(set, get),
      ...createFavoritesSlice(set, get),
      ...createUiSlice(set, get),
    }),
    {
      name: "movie-scout-store",
      partialize: (state) => ({
        likedList: state.likedList, // On ne persiste que les favoris
      }),
    }
  )
);
