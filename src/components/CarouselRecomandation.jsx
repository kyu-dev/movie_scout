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

const CarouselRecomandation = () => {
  const { likedList, setLoading, setError } = useSearchStore();
  const [recommendations, setRecommendations] = useState([]);
  const [lastLikedMovie, setLastLikedMovie] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {

      setLoading(true);
      try {
        // Récupérer le dernier film liké
        const lastMovie = likedList[likedList.length - 1];
        setLastLikedMovie(lastMovie);

        // Récupérer les recommandations pour ce film
        const movieRecommendations = await getRecomandation(lastMovie.id);
        setRecommendations(movieRecommendations);
      } catch (err) {
        setError("Erreur lors de la récupération des recommandations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [likedList, setLoading, setError]);

  return (
    <div id="recommendations" className="p-16">
      {lastLikedMovie && (
        <h2 className="text-white text-2xl font-bold mb-5">
          Parce que vous avez aimé {lastLikedMovie.title}
        </h2>
      )}
      <Carousel>
        <CarouselContent>
          {recommendations &&
            recommendations.map((movie) => (
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

export default CarouselRecomandation;
