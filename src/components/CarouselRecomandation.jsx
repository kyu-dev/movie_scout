import React, { useEffect, useState } from "react";
import { useSearchStore } from "../store";
import { getRecomandation } from "../api/api";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Plus } from "lucide-react"

const CarouselRecomandation = () => {
  const { likedList, setLoading } = useSearchStore();
  const [recommendations, setRecommendations] = useState([]);
  const [lastLikedMovie, setLastLikedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreMovies = async () => {
    if (currentPage >= totalPages || !lastLikedMovie) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newRecommendations = await getRecomandation(
        lastLikedMovie.id,
        nextPage
      );
      setRecommendations([...recommendations, ...newRecommendations.results]);
      setCurrentPage(nextPage);
      setTotalPages(newRecommendations.total_pages);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des recommandations supplémentaires",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (likedList.length === 0) return;

      setLoading(true);
      try {
        const lastMovie = likedList[likedList.length - 1];
        setLastLikedMovie(lastMovie);

        const movieRecommendations = await getRecomandation(lastMovie.id);
        setRecommendations(movieRecommendations.results);
        setTotalPages(movieRecommendations.total_pages);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des recommandations",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [likedList, setLoading]);

  return (
    <div id="recommendations" className="p-8 sm:p-16">
      {lastLikedMovie && (
        <h2 className="text-white text-2xl font-bold mb-5">
          Parce que vous avez aimé {lastLikedMovie.title}
        </h2>
      )}
      <Carousel>
        <CarouselContent>
          {recommendations &&
            recommendations.map((movie, index) => (
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

export default CarouselRecomandation;
