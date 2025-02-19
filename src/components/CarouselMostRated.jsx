import React, { useEffect } from "react";
import { useSearchStore } from "../store";
import { getMostRatedMovies } from "../api/api";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const CarouselComponent = () => {
  const { setMostRated, mostRated, setLoading, setError } = useSearchStore();

  useEffect(() => {
    const fetchMostRatedMovies = async () => {
      setLoading(true);
      try {
        const mostRatedMovies = await getMostRatedMovies();
        setMostRated(mostRatedMovies);
      } catch (err) {
        setError("Erreur lors de la récupération des films populaires");
      } finally {
        setLoading(false);
      }
    };

    fetchMostRatedMovies();
  }, [setMostRated, setLoading, setError]);

  return (
    <div className="p-16">
      <h2 className="text-white text-2xl font-bold mb-5">
        Films les mieux notés
      </h2>
      <Carousel>
        <CarouselContent>
          {mostRated &&
            mostRated.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
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

export default CarouselComponent;
