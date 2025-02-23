import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

const CarouselPopular = () => {
  const { popular, setPopular, setLoading, setError } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newMovies = await getPopularMovies(nextPage);
      setPopular([...popular, ...newMovies.results]);
      setCurrentPage(nextPage);
      setTotalPages(newMovies.total_pages);
    } catch (err) {
      setError("Erreur lors du chargement des films supplémentaires");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setPopular(popularMovies.results);
        setTotalPages(popularMovies.total_pages);
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
            {currentPage < totalPages && (
        <div className="flex justify-center ">
          <Button
            onClick={loadMoreMovies}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Voir plus
          </Button>
        </div>
      )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      
    </div>
  );
};

export default CarouselPopular;
