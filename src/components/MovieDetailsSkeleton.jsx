import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto bg-gray-900/90 rounded-lg shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
        {/* Fond avec animation subtile */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 z-0 animate-pulse"></div>

        {/* Poster Skeleton */}
        <div className="z-10">
          <Skeleton className="w-full aspect-[2/3] rounded-lg bg-gray-800/50" />
        </div>

        {/* Détails Skeleton */}
        <div className="text-white space-y-4 z-10">
          <Skeleton className="h-10 w-3/4 bg-gray-800/50" />
          <Skeleton className="h-6 w-1/2 bg-gray-800/50" />

          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-16 rounded-full bg-gray-800/50" />
            <Skeleton className="h-6 w-32 bg-gray-800/50" />
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-6 w-20 rounded-full bg-gray-800/50"
              />
            ))}
          </div>

          <Skeleton className="h-4 w-full bg-gray-800/50" />
          <Skeleton className="h-4 w-full bg-gray-800/50" />
          <Skeleton className="h-4 w-3/4 bg-gray-800/50" />

          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="h-10 w-32 rounded-md bg-gray-800/50" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-800/50" />
          </div>

          {/* Réalisateur Skeleton */}
          <div className="mt-6">
            <Skeleton className="h-8 w-32 mb-2 bg-gray-800/50" />
            <Skeleton className="h-6 w-48 bg-gray-800/50" />
          </div>

          {/* Acteurs Skeleton */}
          <div className="mt-6">
            <Skeleton className="h-8 w-48 mb-2 bg-gray-800/50" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-20 h-20 rounded-full mb-2 bg-gray-800/50" />
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-800/50" />
                  <Skeleton className="h-3 w-16 bg-gray-800/50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
