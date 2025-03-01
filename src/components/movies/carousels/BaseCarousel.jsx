import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Plus } from "lucide-react";

const BaseCarousel = ({
  title,
  items,
  renderItem,
  onLoadMore = null,
  hasMore = false,
  loadingMore = false,
  id = null
}) => {
  return (
    <div id={id} className="p-8 sm:p-14">
      {title && <h2 className="text-white text-2xl font-bold mb-5">{title}</h2>}

      <Carousel>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              key={`${item.id || index}-${index}`}
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}

          {hasMore && onLoadMore && (
            <CarouselItem
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div
                className="h-full relative group overflow-hidden transform transition-transform duration-500 ease-in-out bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={onLoadMore}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-blue-600 rounded-full p-4 mb-4 hover:bg-blue-700 transition-colors">
                    <Plus size={32} className="text-white" />
                  </div>
                  <p className="text-white text-lg font-medium">
                    {loadingMore ? "Chargement..." : "Voir plus"}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Découvrir d'autres films</p>
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

export default BaseCarousel;
