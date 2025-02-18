import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/api";
import { useSearchStore } from "../store";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const { popular, error, loading, setLoading } = useSearchStore();
  const [imageUrl, setImageUrl] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [genres, setGenres] = useState([]);

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
      } catch (err) {
        console.error("Erreur lors de la récupération de l'image", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovieImage();
  }, [popular, setLoading]);

  if (loading) return <p>Chargement de l'image...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-[600px] relative">
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={`Affiche du film ${randomMovie?.title}`}
            className="w-full h-full object-cover"
          />
          {randomMovie && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
              <h2 className="text-white text-4xl font-bold z-10">
                {randomMovie.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge key={genre.id} variant="outline" className="text-white">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;