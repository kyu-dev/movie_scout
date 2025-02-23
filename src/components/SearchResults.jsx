import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages || loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getMoviesByGenre(genreId, nextPage);
      setMovies([...movies, ...response.results]);
      setCurrentPage(nextPage);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Erreur lors du chargement des films supplémentaires");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const threshold = 100; // Nombre de pixels avant la fin pour déclencher le chargement

      // Vérifie si l'utilisateur est proche du bas de la page
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        // Vérifie qu'on n'est pas déjà en train de charger et qu'il reste des pages à charger
        if (!loading && currentPage < totalPages) {
          loadMoreMovies();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, loading]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (genreId) {
        setLoading(true);
        try {
          const response = await getMoviesByGenre(genreId, 1);
          setMovies(response.results);
          setTotalPages(response.total_pages);
          setCurrentPage(1);
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
          movies.map((movie, index) => (
            <li key={`${movie.id}-${index}`}>
              <MovieCard movie={movie} />
            </li>
          ))}
      </ul>
      {loading && currentPage > 1 && (
        <div className="flex justify-center mt-8">
          <p>Chargement des films supplémentaires...</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
