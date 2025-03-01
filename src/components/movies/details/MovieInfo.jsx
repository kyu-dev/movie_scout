import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from '../../../store/store';

const MovieInfo = ({
  movie,
  onTrailerClick,
  hasTrailer,
  isTrailerLoading
}) => {
  const { likedList, setLikedList } = useStore();
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (movie) {
      const liked = likedList?.some((likedMovie) => likedMovie.id === movie.id);
      setIsLiked(liked);
    }
  }, [movie, likedList]);

  const handleLike = () => {
    if (!movie) return;

    if (isLiked) {
      setLikedList(likedList.filter((likedMovie) => likedMovie.id !== movie.id));
    } else {
      setLikedList([...likedList, movie]);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="text-white space-y-4 z-10">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-gray-300">{movie.tagline}</p>

      <div className="flex items-center space-x-4">
        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {movie.release_date?.split("-")[0]}
        </span>
        <span className="text-gray-300">
          {movie.runtime} minutes
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {movie.genres?.map((genre) => (
          <Badge key={genre.id} variant="outline" className="text-white">
            {genre.name}
          </Badge>
        ))}
      </div>

      <p className="text-gray-300">{movie.overview}</p>

      <div className="flex items-center gap-2 mt-4">
        {hasTrailer && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-fit transform transition-all hover:scale-105 active:scale-95"
            onClick={onTrailerClick}
          >
            {isTrailerLoading ? "Chargement..." : "Voir le trailer"}
          </Button>
        )}
        <button
          onClick={handleLike}
          className={`p-1 rounded-full transition-colors ${
            isLiked ? "text-red-500" : "text-gray-300 hover:text-red-500"
          }`}
          aria-label={isLiked ? `Retirer ${movie.title} des favoris` : `Ajouter ${movie.title} aux favoris`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default MovieInfo;
