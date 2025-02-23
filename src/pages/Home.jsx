import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import CarouselPopular from "../components/CarouselPopular";
import CarouselMostRated from "../components/CarouselMostRated";
import CarouselRecomandation from "@/components/CarouselRecomandation";
import { useSearchStore } from "@/store";
import { useLocation } from "react-router-dom";
import CarouselGenre from "@/components/CarouselGenre";

const Home = () => {
  const { likedList } = useSearchStore();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-gray-900 h-full">
      <Hero />
      <CarouselPopular />
      <CarouselMostRated />
      {likedList.length > 0 && <CarouselRecomandation />}
      <CarouselGenre/>
    </div>
  );
};

export default Home;
