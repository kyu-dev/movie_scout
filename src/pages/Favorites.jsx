import React from "react";
import { useSearchStore } from "../store";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { likedList } = useSearchStore();

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Mes Favoris</h1>

      {likedList.length === 0 ? (
        <div className="text-gray-400 text-center">
          <p>Vous n'avez aucun film favori pour le moment.</p>
          <p>Ajoutez des films à vos favoris en cliquant sur le cœur !</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {likedList.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
