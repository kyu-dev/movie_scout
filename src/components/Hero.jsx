import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/api";
import { useSearchStore } from "../store";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const { popular, error, loading, setLoading } = useSearchStore();
  const [imageUrl, setImageUrl] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchRandomMovieImage = async () => {
      if (!popular || popular.length === 0) return;

      try {
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * popular.length);
        const selectedMovie = popular[randomIndex];
        setRandomMovie(selectedMovie);

        const movieDetails = await getMovieDetails(selectedMovie.id);

        if (movieDetails.backdrop_path) {
          const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
          setImageUrl(backdropUrl);
        }

        // Récupérer les genres du film
        if (movieDetails.genres) {
          setGenres(movieDetails.genres);
        }
        if(movieDetails.overview){
            setDescription(movieDetails.overview)
        }

      } catch (err) {
        console.error("Erreur lors de la récupération de l'image", err);
        if (retryCount < 3) {
          setRetryCount(retryCount + 1);
          setTimeout(fetchRandomMovieImage, 2000); // Réessayer après 2 secondes
        } else {
          setError("Impossible de charger l'image après plusieurs tentatives");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovieImage();
  }, [popular, setLoading, imageUrl, retryCount]);

  if (loading) return <p>Chargement de l'image...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-[650px] relative">
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={`Affiche du film ${randomMovie?.title}`}
            className="w-full h-full object-cover"
          />
          {randomMovie && (
            <div className="absolute inset-0 bg-black/50 flex flex-col  justify-end p-16 gap-4">
              <h2 className="text-white text-4xl font-bold z-10">
                {randomMovie.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="text-white"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <p className="text-white w-100 text-sm">   
                {description}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
