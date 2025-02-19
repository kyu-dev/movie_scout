import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store";
import { Heart } from "lucide-react"; // Import de l'icône Heart

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { setMovieId, setLikedList, likedList } = useSearchStore();

  const isLiked =
    likedList?.some((likedMovie) => likedMovie.id === movie.id) || false;

  const handleLike = (e) => {
    e.stopPropagation(); // Empêche la navigation lors du clic sur le cœur

    // Vérifie si likeList est un tableau
    if (!Array.isArray(likedList)) {
      console.error("likeList n'est pas un tableau");
      return;
    }

    if (isLiked) {
      setLikedList(
        likedList.filter((likedMovie) => likedMovie.id !== movie.id)
      );
    } else {
      setLikedList([...likedList, movie]);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div
      className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative group overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105"
      onClick={() => {
        setMovieId(movie.id);
        navigate(`/movie/${movie.id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
      />

      <div
        className="absolute inset-0
         bg-blue-900/80 backdrop-blur-sm shadow-lg shadow-blue-800/50 opacity-0 group-hover:opacity-100
          transition-all duration-500 ease-in-out delay-200 group-hover:delay-400 group-focus:delay-100
          p-4 flex flex-col justify-between rounded-lg z-10"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-300 text-lg">En Savoir plus</p>
        </div>

        <div className="meta">
          <h3 className="text-white text-lg font-bold">{movie.title}</h3>
          <button
            onClick={handleLike}
            className={`p-1 rounded-full transition-colors ${
              isLiked ? "text-red-500" : "text-gray-300 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <p className="text-gray-300 text-sm">
            Sortie : {formatDate(movie.release_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
