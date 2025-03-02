import React, { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import { useStore } from "../store/store";
import { useLocation } from "react-router-dom";
import { getMoviesByGenre, fetchMovies } from "../api/api";

function SearchResults() {
  const { movies, loading, setMovies, setLoading, query } = useStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genreId = searchParams.get("genre");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loaderRef = useRef(null);
  const [error, setError] = useState("");

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages || loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      let response;
      if (genreId) {
        response = await getMoviesByGenre(genreId, nextPage);
      } else {
        response = await fetchMovies(query, nextPage);
      }
      if (response && Array.isArray(response.results)) {
        setMovies([...movies, ...response.results]);
        setCurrentPage(nextPage);
        setTotalPages(response.total_pages);
      } else {
        throw new Error("Format de réponse inattendu de l'API");
      }
    } catch (err) {
      setError("Erreur lors du chargement des films supplémentaires");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && currentPage < totalPages) {
          loadMoreMovies();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [currentPage, totalPages, loading]);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (genreId) {
          response = await getMoviesByGenre(genreId, 1);
        } else {
          response = await fetchMovies(query, 1);
        }
        if (response && Array.isArray(response.results)) {
          setMovies(response.results);
          setTotalPages(response.total_pages);
          setCurrentPage(1);
        } else {
          throw new Error("Format de réponse inattendu de l'API");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des films");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, [genreId, query, setMovies, setLoading, setError]);

  return (
    <div className="bg-gray-900 p-10">
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {loading && <p>Chargement des films...</p>}
        {error && <p>{error}</p>}
        {movies &&
          movies
            .filter((movie) => movie.poster_path) // filtre les élément qui n'on pas d'image pour ne pas afficher les faux films
            .map((movie, index) => (
              <li key={`${movie.id}-${index}`}>
                <MovieCard movie={movie} />
              </li>
            ))}
      </ul>
      <div ref={loaderRef} className="h-20">
        {loading && currentPage > 1 && (
          <div className="flex justify-center mt-8">
            <p>Chargement des films supplémentaires...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
