import React, { useEffect, useState } from "react";
import { getMoviesVideos } from "../api/api";
import { useSearchStore } from "../store";

const MovieDetails = () => {
  const { movieId, error, loading, trailerUrl, setTrailerUrl, setLoading } = useSearchStore();

  // Ce useEffect est déclenché à chaque changement de movieId
  // Il récupère l'URL de la bande-annonce via l'API video de tmdb
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const url = await getMoviesVideos(movieId);
        setTrailerUrl(url);
      } catch (err) {
        setError("Erreur lors de la récupération de la vidéo");
      } finally {
        setLoading(false); // On arrête le chargement dans tous les cas (succès ou erreur)
      }
    };

    fetchTrailer(); // Appel de la fonction asynchrone
  }, [movieId]); // Dépendance : le useEffect se relance si movieId change

  if (loading) return <p>Chargement de la vidéo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Détails du film ID: {movieId}</h1>
      {trailerUrl && (
        <iframe
          width="560"
          height="315"
          src={trailerUrl.replace("watch?v=", "embed/")}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MovieDetails;
