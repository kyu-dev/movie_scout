import { create } from "zustand";

export const useSearchStore = create((set) => ({
  query: "",
  movies: [],
  loading: false,           //state
  error: null,
  movieId: null, 
  trailerUrl: "",
  setQuery: (query) => set({ query }),
  setMovies: (movies) => set({ movies }),
  setLoading: (loading) => set({ loading }), //setter
  setError: (error) => set({ error }),
  setMovieId: (movieId) => set({ movieId }), 
  setTrailerUrl: (trailerUrl) => set ({trailerUrl})
}));