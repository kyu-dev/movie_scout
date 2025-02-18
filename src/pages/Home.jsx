import React from "react";
import Hero from "@/components/Hero";
import CarouselPopular from "../components/CarouselPopular";
import CarouselMostRated from "../components/CarouselMostRated";

const Home = () => {
  return (
    <div className="bg-blue-950 h-full">
      <Hero />
      <CarouselPopular />
      <CarouselMostRated />
    </div>
  );
};

export default Home;
