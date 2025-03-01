export const createMovieSlice = (set) => ({
  // État
  popular: [],
  mostRated: [],
  movieId: null,
  heroImage: null,
  heroMovie: null,

  // Actions
  setPopular: (popular) => set({ popular }),
  setMostRated: (mostRated) => set({ mostRated }),
  setMovieId: (movieId) => set({ movieId }),
  setHeroImage: (heroImage) => set({ heroImage }),
  setHeroMovie: (heroMovie) => set({ heroMovie }),
});
