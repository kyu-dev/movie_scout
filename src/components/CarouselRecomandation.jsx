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
import { Button } from "@/components/ui/button";

const CarouselRecomandation = () => {
  const { likedList, setLoading } = useSearchStore();
  const [recommendations, setRecommendations] = useState([]);
  const [lastLikedMovie, setLastLikedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMoreRecommendations = async () => {
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
    <div id="recommendations" className="p-8 sm:p-14">
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
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMoreRecommendations}
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

export default CarouselRecomandation;
