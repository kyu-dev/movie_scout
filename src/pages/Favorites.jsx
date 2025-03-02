import React from 'react';
import { useStore } from '../store/store';
import MovieCard from '../components/MovieCard';
import { BackButton } from '@/components/ui/back-button';

const Favorites = () => {
  const { likedList, setQuery } = useStore();

  return (
    <div className='bg-gray-900 min-h-screen p-8 md:p-16'>
      <div className='flex flex-row gap-10'>
        <BackButton className='mb-10' onBack={() => setQuery('')} />
        <h2 className='text-2xl text-blue-300 font-medium'>Vos Favoris</h2>
      </div>

      {likedList.length === 0 ? (
        <div className='text-gray-400 text-center'>
          <p>Vous n'avez aucun film favori pour le moment.</p>
          <p>Ajoutez des films à vos favoris en cliquant sur le cœur !</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {likedList.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
