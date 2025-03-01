import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { getPopularMovies } from "../api/api";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Plus } from "lucide-react";

const CarouselPopular = () => {
  const { popular, setPopular, setLoading } = useStore();
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
      console.error("Erreur lors du chargement des films supplémentaires", err);
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
        console.error(
          "Erreur lors de la récupération des films populaires",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [setPopular, setLoading]);

  return (
    <div id="popular" className="p-8 sm:p-16">
      <h2 className="text-white text-2xl font-bold mb-5">Films populaires</h2>
      <Carousel>
        <CarouselContent>
          {popular &&
            popular.map((movie, index) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                key={`${movie.id}-${index}`}
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}

          {currentPage < totalPages && (
            <CarouselItem
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div
                className="h-full relative group overflow-hidden transform transition-transform duration-500 ease-in-out bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={loadMoreMovies}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-blue-600 rounded-full p-4 mb-4">
                    <Plus size={32} className="text-white" />
                  </div>
                  <p className="text-white text-lg font-medium">Voir plus</p>
                  <p className="text-gray-400 text-sm mt-2">Découvrir d'autres films populaires</p>
                </div>
              </div>
            </CarouselItem>
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

export default CarouselPopular;
