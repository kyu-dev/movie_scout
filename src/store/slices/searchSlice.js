export const createSearchSlice = (set) => ({
  // État
  query: '',
  movies: [],
  loading: false,
  genre: [],

  // Actions
  setQuery: (query) => set({ query }),
  setMovies: (movies) => set({ movies }),
  setLoading: (loading) => set({ loading }),
  setGenre: (genre) => set({ genre }),
});
