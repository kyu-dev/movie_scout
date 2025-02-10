import React from "react";
import MovieCard from "./MovieCard";

function SearchResults({ error, movies, loading }) {
  return (
    <div className="bg-amber-300">
      <ul className="grid grid-cols-4 gap-4">
        {loading && <p>Chargement des films...</p>}
        {error && <p>{error}</p>}
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
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
