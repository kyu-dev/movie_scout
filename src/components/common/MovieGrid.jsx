import React from 'react';
import MovieCard from '../movies/cards/MovieCard';

const MovieGrid = ({
  movies,
  emptyMessage = "Aucun film trouvé",
  className = "",
  onLoadMore = null,
  hasMore = false,
  loadingMore = false
}) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-white text-center p-8">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ${className}`}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}

      {hasMore && onLoadMore && (
        <div
          className="h-full relative group overflow-hidden transform transition-transform duration-500 ease-in-out bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={onLoadMore}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-blue-600 rounded-full p-4 mb-4 hover:bg-blue-700 transition-colors">
              <PlusIcon size={32} className="text-white" />
            </div>
            <p className="text-white text-lg font-medium">
              {loadingMore ? "Chargement..." : "Voir plus"}
            </p>
            <p className="text-gray-400 text-sm mt-2">Découvrir d'autres films</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
