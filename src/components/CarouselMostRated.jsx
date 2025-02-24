import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

const CarouselComponent = () => {
  const { setMostRated, mostRated, setLoading } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreRatedMovies = async () => {
    if (currentPage >= totalPages) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newRatedMovies = await getMostRatedMovies(nextPage);
      setMostRated([...mostRated, ...newRatedMovies.results]);
      setCurrentPage(nextPage);
      setTotalPages(newRatedMovies.total_pages);
    } catch (err) {
      console.error("Erreur lors du chargement des films supplémentaires", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMostRatedMovies = async () => {
      setLoading(true);
      try {
        const mostRatedMovies = await getMostRatedMovies();
        setMostRated(mostRatedMovies.results);
        setTotalPages(mostRatedMovies.total_pages);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des films populaires",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMostRatedMovies();
  }, [setMostRated, setLoading]);

  return (
    <div id="top-rated" className="p-8 sm:p-14">
      <h2 className="text-white text-2xl font-bold mb-5">
        Films les mieux notés
      </h2>
      <Carousel>
        <CarouselContent>
          {mostRated &&
            mostRated.map((movie, index) => (
              <CarouselItem
                key={`${movie.id}-${index}`}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}

          {currentPage < totalPages && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMoreRatedMovies}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Voir plus
              </Button>
            </div>
          )}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
