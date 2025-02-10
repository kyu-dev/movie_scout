import React from "react";

const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div>
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
