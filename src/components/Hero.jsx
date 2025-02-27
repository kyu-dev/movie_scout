import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/api";
import { useSearchStore } from "../store";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const {
    popular,
    heroImage,
    setHeroImage,
    heroMovie,
    setHeroMovie,
    setMovieId,
  } = useSearchStore();
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRandomMovieImage = async () => {
      if (!popular || popular.length === 0) return;

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
        }
        return;
      }

      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchRandomMovieImage();
  }, [popular, setLoading, setHeroImage, setHeroMovie, heroMovie]);

  if (loading || !heroImage) {
    return (
      <div className="w-full h-[650px] relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 p-16 flex flex-col justify-end gap-4">
          <Skeleton className="h-8 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full relative overflow-hidden">
      {heroImage && (
        <>
          <img
            src={heroImage}
            alt={`Affiche du film ${heroMovie?.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col 
          items-center md:items-start
          justify-center md:justify-end p-8 md:p-12 lg:p-16 md:gap-6 gap-2">
            <h2 className="text-white text-5xl font-bold z-10 drop-shadow-2xl">
              {heroMovie.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="text-white bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/30"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-fit transform transition-all hover:scale-105 active:scale-95  "
              onClick={() => {
                setMovieId(heroMovie.id);
                navigate(`/movie/${heroMovie.id}`);
              }}
            >
              En savoir plus
            </Button>
            <p className="text-white/80 w-full hidden md:block non text-sm max-w-2xl leading-relaxed  md:px-0">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
