import { create } from "zustand";

export const useSearchStore = create((set) => ({
  // renommé car on n'a pas que la logique de recherche ici
  query: "",
  movies: [],
  loading: false,
  error: null,
  movieId: null,
  trailerUrl: "",
  popular: [],
  mostRated: [],
  likedList: [],
  heroImage: null,
  heroMovie: null,
  

  setQuery: (query) => set({ query }),
  setMovies: (movies) => set({ movies }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMovieId: (movieId) => set({ movieId }),
  setTrailerUrl: (trailerUrl) => set({ trailerUrl }),
  setPopular: (popular) => set({ popular }),
  setMostRated: (mostRated) => set({ mostRated }),
  setLikedList: (likedList) => set({ likedList }),
  setHeroImage: (heroImage) => set({ heroImage }),
  setHeroMovie: (heroMovie) => set({ heroMovie }),
}));
