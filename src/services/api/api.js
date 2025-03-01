import apiClient from './client';
import { ENDPOINTS } from './endpoints';

// Système de cache simple
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const fetchWithCache = async (url, params = {}) => {
  const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const response = await apiClient.get(url, { params });
  cache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now()
  });

  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  return fetchWithCache(ENDPOINTS.POPULAR, { page });
};

export const getMostRatedMovies = async (page = 1) => {
  return fetchWithCache(ENDPOINTS.TOP_RATED, { page });
};

export const getMovieDetails = async (movieId) => {
  return fetchWithCache(ENDPOINTS.MOVIE_DETAILS(movieId));
};

export const getMoviesVideos = async (movieId) => {
  const data = await fetchWithCache(ENDPOINTS.MOVIE_VIDEOS(movieId));
  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

export const getCasting = async (movieId) => {
  return fetchWithCache(ENDPOINTS.MOVIE_CREDITS(movieId));
};

export const searchMovies = async (query, page = 1) => {
  return fetchWithCache(ENDPOINTS.SEARCH, { query, page });
};

export const getGenre = async () => {
  const data = await fetchWithCache(ENDPOINTS.GENRES);
  return data.genres;
};

export const searchMoviesByGenre = async (genreId, page = 1) => {
  return fetchWithCache(ENDPOINTS.DISCOVER, {
    with_genres: genreId,
    page
  });
};
