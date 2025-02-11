import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams();

  return (
    <div>
      <h1>Détails du film ID: {movieId}</h1>
      {/* Ici vous pouvez ajouter la logique pour récupérer et afficher les détails du film */}
    </div>
  );
};

export default MovieDetails;
