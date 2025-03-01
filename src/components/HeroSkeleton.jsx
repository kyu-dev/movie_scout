import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  // S'assurer que la page est en haut
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <div className="w-full h-[650px] relative overflow-hidden">
      {/* Fond avec animation subtile */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/50 animate-pulse"></div>

      {/* Contenu du Hero */}
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end gap-4 z-10">
        {/* Titre */}
        <Skeleton className="h-10 w-3/4 md:w-1/2 bg-gray-800/50 rounded-lg" />

        {/* Badges/Genres */}
        <div className="flex flex-wrap gap-2 my-4">
          <Skeleton className="h-6 w-20 rounded-full bg-gray-800/50" />
          <Skeleton className="h-6 w-24 rounded-full bg-gray-800/50" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-800/50" />
        </div>

        {/* Bouton */}
        <Skeleton className="h-10 w-32 rounded-md bg-gray-800/50" />

        {/* Description */}
        <Skeleton className="h-4 w-full max-w-2xl bg-gray-800/50" />
        <Skeleton className="h-4 w-full max-w-2xl bg-gray-800/50" />
        <Skeleton className="h-4 w-3/4 max-w-2xl bg-gray-800/50" />
      </div>

      {/* Overlay dégradé pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
    </div>
  );
};

export default HeroSkeleton;
