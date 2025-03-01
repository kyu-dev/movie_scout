export const createFavoritesSlice = (set, get) => ({
  // État
  likedList: [],

  // Actions
  setLikedList: (likedList) => set({ likedList }),

  // Actions avancées
  addToFavorites: (movie) => {
    const { likedList } = get();
    if (!likedList.some(item => item.id === movie.id)) {
      set({ likedList: [...likedList, movie] });
    }
  },

  removeFromFavorites: (movieId) => {
    const { likedList } = get();
    set({ likedList: likedList.filter(movie => movie.id !== movieId) });
  },

  toggleFavorite: (movie) => {
    const { likedList } = get();
    const isLiked = likedList.some(item => item.id === movie.id);

    if (isLiked) {
      set({ likedList: likedList.filter(item => item.id !== movie.id) });
    } else {
      set({ likedList: [...likedList, movie] });
    }
  },

  isFavorite: (movieId) => {
    return get().likedList.some(movie => movie.id === movieId);
  }
});
