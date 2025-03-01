import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/api";
import { useStore } from "../store/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HeroSkeleton from "./HeroSkeleton";

const Hero = () => {
  const navigate = useNavigate();
  const {
    popular,
    heroImage,
    setHeroImage,
    heroMovie,
    setHeroMovie,
    setMovieId,
  } = useStore();
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fonction pour s'assurer que la page est en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  useEffect(() => {
    // S'assurer que la page est en haut au chargement
    scrollToTop();

    const fetchRandomMovieImage = async () => {
      if (!popular || popular.length === 0) return;

      setIsLoading(true);

      if (heroMovie) {
        try {
          const movieDetails = await getMovieDetails(heroMovie.id);
          if (movieDetails.genres) {
            setGenres(movieDetails.genres);
          }
          if (movieDetails.overview) {
            setDescription(movieDetails.overview);
          }
        } catch (err) {
          console.error(
            "Erreur lors de la récupération des détails du film",
            err
          );
          setError("Erreur lors de la récupération des détails du film");
        } finally {
          // Délai minimal pour éviter un flash du skeleton
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
        return;
      }

      try {
        const randomIndex = Math.floor(Math.random() * popular.length);
        const selectedMovie = popular[randomIndex];
        setHeroMovie(selectedMovie);

        const movieDetails = await getMovieDetails(selectedMovie.id);

        if (movieDetails.backdrop_path) {
          const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
          setHeroImage(backdropUrl);
        }

        if (movieDetails.genres) {
          setGenres(movieDetails.genres);
        }
        if (movieDetails.overview) {
          setDescription(movieDetails.overview);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de l'image", err);
        setError("Erreur lors de la récupération des informations du film");
      } finally {
        // Délai minimal pour éviter un flash du skeleton
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchRandomMovieImage();
  }, [popular, setHeroImage, setHeroMovie, heroMovie]);

  const handleMovieClick = () => {
    if (heroMovie) {
      setMovieId(heroMovie.id);
      navigate(`/movie/${heroMovie.id}`);
    }
  };

  if (isLoading || !heroImage) {
    return <HeroSkeleton />;
  }

  if (error) return <p className="text-white p-8">{error}</p>;

  return (
    <div
      className="w-full h-[650px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay dégradé pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {heroMovie?.title}
        </h1>

        <div className="flex flex-wrap gap-2 my-4">
          {genres.map((genre) => (
            <Badge key={genre.id} variant="outline" className="text-white">
              {genre.name}
            </Badge>
          ))}
        </div>

        <Button
          onClick={handleMovieClick}
          className="bg-blue-600 hover:bg-blue-700 w-fit transform transition-all hover:scale-105 active:scale-95 mb-4"
        >
          En savoir plus
        </Button>

        <p className="text-gray-300 max-w-2xl line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Hero;
