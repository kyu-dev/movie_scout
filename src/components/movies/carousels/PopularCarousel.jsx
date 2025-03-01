import React from 'react';
import { usePopularMovies } from '../../../hooks/useMovies';
import MovieCard from '../cards/MovieCard';
import BaseCarousel from './BaseCarousel';
import { CarouselSkeleton } from '@/components/ui/skeletons';

const PopularCarousel = () => {
  const { movies, loading, loadMore, hasMore } = usePopularMovies();

  if (loading && (!movies || movies.length === 0)) {
    return <CarouselSkeleton />;
  }

  return (
    <BaseCarousel
      id="popular"
      title="Films populaires"
      items={movies}
      renderItem={(movie) => <MovieCard movie={movie} />}
      onLoadMore={loadMore}
      hasMore={hasMore}
      loadingMore={loading}
    />
  );
};

export default PopularCarousel;
