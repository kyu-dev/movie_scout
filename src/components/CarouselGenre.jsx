import { useEffect } from 'react';
import { getGenre } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const GenreList = () => {
  const navigate = useNavigate();
  const { genre: globalGenres, setGenre } = useStore();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (globalGenres.length > 0) return;

        const response = await getGenre();
        setGenre(response);
      } catch (err) {
        console.error('Erreur :', err);
        throw new Error('Erreur lors de la récupération des genres');
      }
    };

    fetchGenres();
  }, [globalGenres, setGenre]);

  return (
    <div className='text-white p-8 sm:p-16'>
      <h2 className='text-2xl font-bold mb-4'>Tous les Genres</h2>
      <Carousel>
        <CarouselContent>
          {globalGenres.map((genre) => (
            <CarouselItem
              key={genre.id}
              className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
              onClick={() => navigate(`/search?genre=${genre.id}`)}
            >
              <div className='bg-gray-800 w-auto h-50 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center'>
                <h3 className='text-lg font-semibold'>{genre.name}</h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden sm:block'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default GenreList;
