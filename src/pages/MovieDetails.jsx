import React, { useState, useEffect } from "react";
import { getMoviesVideos, getMovieDetails, getCasting } from "../api/api";
import { useSearchStore } from "../store";
import { Badge } from "@/components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Heart } from "lucide-react";

const MovieDetails = () => {
  const { movieId, likedList, setLikedList } = useSearchStore();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [casting, setCasting] = useState(null);

  const checkTrailerAvailability = async () => {
    try {
      const url = await getMoviesVideos(movieId);
      setHasTrailer(!!url);
    } catch (err) {
      setError("Erreur lors de la vérification du trailer");
    }
  };

  const getCredit = async () => {
    try {
      const credits = await getCasting(movieId);
      setCasting(credits);
    } catch (err) {
      console.error("Erreur lors de la récupération du casting", err);
    }
  };

  const getDetails = async () => {
    try {
      const details = await getMovieDetails(movieId);
      setMovieDetails(details);
    } catch (err) {
      throw new Error("Erreur lors de la récupération des détails du film");
    }
  };

  useEffect(() => {
    checkTrailerAvailability();
    getDetails();
    getCredit();
  }, [movieId]);

  useEffect(() => {
    if (movieDetails) {
      const liked = likedList?.some((movie) => movie.id === movieDetails.id);
      setIsLiked(liked);
    }
  }, [movieDetails, likedList]);

  const handleTrailerClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await getMoviesVideos(movieId);
      if (url) {
        setTrailerUrl(url);
        setIsOpen(true);
      } else {
        setError("Aucun trailer disponible pour ce film");
        setHasTrailer(false);
      }
    } catch (err) {
      setError("Erreur lors de la récupération de la vidéo");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (!movieDetails) return;

    if (isLiked) {
      setLikedList(likedList.filter((movie) => movie.id !== movieDetails.id));
    } else {
      setLikedList([...likedList, movieDetails]);
    }
    setIsLiked(!isLiked);
  };

  if (!movieDetails) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center fade-in">
      <div className="bg-gray-950 backdrop-blur-sm min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-gray-900/90 rounded-lg shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 blur-xl opacity-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
            }}
          ></div>
          <div className="z-10">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="text-white space-y-4 z-10">
            <h1 className="text-4xl font-bold">{movieDetails.title}</h1>
            <p className="text-gray-300">{movieDetails.tagline}</p>

            <div className="flex items-center space-x-4">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                {movieDetails.release_date?.split("-")[0]}
              </span>
              <span className="text-gray-300">
                {movieDetails.runtime} minutes
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movieDetails.genres?.map((genre) => (
                <Badge key={genre.id} variant="outline" className="text-white">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300">{movieDetails.overview}</p>

            <div className="flex items-center gap-2 mt-4">
              {hasTrailer && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-fit transform transition-all hover:scale-105 active:scale-95"
                  onClick={handleTrailerClick}
                >
                  {loading ? "Chargement..." : "Voir le trailer"}
                </Button>
              )}
              <button
                onClick={handleLike}
                className={`p-1 rounded-full transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-300 hover:text-red-500"
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </button>
            </div>

            {casting && (
              <>
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Réalisateur</h3>
                  <p className="text-gray-300">
                    {casting.crew?.find((member) => member.job === "Director")
                      ?.name || "Inconnu"}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Acteurs principaux</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {casting.cast?.slice(0, 4).map((actor) => (
                      <div
                        key={actor.id}
                        className="flex flex-col items-center"
                      >
                        <img

                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt={actor.name}
                          className="w-20 h-20 rounded-full object-cover mb-2"
                        />
                        <p className="text-center text-gray-300">
                          {actor.name}
                        </p>
                        <p className="text-center text-sm text-gray-400">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Bande-annonce</DialogTitle>
          </DialogHeader>
          {trailerUrl && (
            <iframe
              width="560"
              height="315"
              src={trailerUrl.replace("watch?v=", "embed/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
