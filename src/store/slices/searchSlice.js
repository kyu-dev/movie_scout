export const createSearchSlice = (set) => ({
  // État
  query: "",
  movies: [],
  loading: false,

  // Actions
  setQuery: (query) => set({ query }),
  setMovies: (movies) => set({ movies }),
  setLoading: (loading) => set({ loading }),
});
