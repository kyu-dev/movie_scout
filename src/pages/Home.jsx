import React from "react";
import Hero from "@/components/Hero";
import CarouselPopular from "../components/CarouselPopular";
import CarouselMostRated from "../components/CarouselMostRated";
import CarouselRecomandation from "@/components/CarouselRecomandation";
import { useSearchStore } from "@/store";

const Home = () => {
  const { likedList } = useSearchStore();
  return (
    <div className="bg-gray-950 h-full">
      <Hero/>
      <CarouselPopular />
      <CarouselMostRated />
      {likedList.length > 0 && <CarouselRecomandation />}
    </div>
  );
};

export default Home;
