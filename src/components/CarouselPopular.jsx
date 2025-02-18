import React, { useEffect } from "react";
import { useSearchStore } from "../store";
import { getPopularMovies } from "../api/api";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const CarouselPopular = () => {
  const { popular, setPopular, setLoading, setError } = useSearchStore();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setPopular(popularMovies);
      } catch (err) {
        setError("Erreur lors de la récupération des films populaires");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [setPopular, setLoading, setError]);

  return (
    <div id="popular" className="p-16">
      <h2 className="text-white text-2xl font-bold mb-5">Films populaires</h2>
      <Carousel>
        <CarouselContent>
          {popular &&
            popular.map((movie) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                key={movie.id}
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselPopular;
