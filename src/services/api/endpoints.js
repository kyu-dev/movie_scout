// Centralisation des endpoints
export const ENDPOINTS = {
  POPULAR: '/movie/popular',
  TOP_RATED: '/movie/top_rated',
  MOVIE_DETAILS: (id) => `/movie/${id}`,
  MOVIE_VIDEOS: (id) => `/movie/${id}/videos`,
  MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
  SEARCH: '/search/movie',
  GENRES: '/genre/movie/list',
  DISCOVER: '/discover/movie',
};
