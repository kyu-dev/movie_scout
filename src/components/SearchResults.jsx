import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { useSearchStore } from "../store";
import { useLocation } from "react-router-dom";
import { getMoviesByGenre } from "../api/api";

function SearchResults() {
  const { movies, loading, error, setMovies, setLoading, setError } =
    useSearchStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreId = searchParams.get("genre");

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (genreId) {
        setLoading(true);
        try {
          const response = await getMoviesByGenre(genreId);
          setMovies(response.results);
        } catch (err) {
          setError("Erreur lors de la récupération des films");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMoviesByGenre();
  }, [genreId, setMovies, setLoading, setError]);

  return (
    <div className="bg-gray-900 p-10">
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {loading && <p>Chargement des films...</p>}
        {error && <p>{error}</p>}
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchResults;
