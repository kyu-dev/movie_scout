import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { setMovieId } = useSearchStore();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div
      className="w-full relative group"
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
         bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 group-hover:scale-105
          transition-all duration-500 ease-in-out delay-200 group-hover:delay-400 group-focus:delay-100
          p-4 flex flex-col justify-end rounded-lg z-10"
      >
        <h3 className="text-white text-lg font-bold">{movie.title}</h3>
        <p className="text-gray-300 text-sm">
          Sortie : {formatDate(movie.release_date)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
