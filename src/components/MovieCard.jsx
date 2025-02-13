import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div onClick={() => {
      useSearchStore.getState().setMovieId(movie.id);
      navigate(`/movie/${movie.id}`);
    }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-50"
      />
      <h2>{movie.title}</h2>
      <p>{formatDate(movie.release_date)}</p>
    </div>
  );
};

export default MovieCard;