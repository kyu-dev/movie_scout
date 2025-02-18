import React from "react";
import MovieCard from "./MovieCard";
import { useSearchStore } from "../store";

function SearchResults() {
  const { movies, loading, error } = useSearchStore();
  return (
    <div className="bg-gray-900 p-10">
      <ul className="grid grid-cols-6 gap-10  ">
        {loading && <p>Chargement des films...</p>}
        {error && <p>{error}</p>}
        {movies &&
          movies.map((movie) => (
            <li 
            key={movie.id}>
              <MovieCard
                movie={movie}
                loading={loading}
                movies={movies}
                error={error}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchResults;
