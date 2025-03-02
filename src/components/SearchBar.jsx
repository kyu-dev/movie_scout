import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import { useStore } from '../store/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const { query, setQuery, setMovies, setLoading } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      navigate('/');
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMovies(query);
        if (result && Array.isArray(result.results)) {
          setMovies(result.results);
        } else {
          throw new Error("Format de réponse inattendu de l'API");
        }
        navigate('/search');
      } catch (err) {
        setError('Erreur lors de la récupération des films');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, navigate, setMovies, setLoading, setError]);

  useEffect(() => {
    const handlePopState = () => {
      setQuery('');
      setMovies([]);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setQuery, setMovies]);

  return (
    <div className='bg-amber-50 w-full max-w-2xl px-4 py-2 rounded-3xl shadow-lg'>
      <div className='flex items-center gap-2'>
        <Search className='text-gray-500 w-5 h-5' />
        <input
          type='text'
          placeholder='Rechercher un film...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full bg-transparent focus:outline-none placeholder-gray-400 text-sm sm:text-base flex-1 min-w-0'
        />
        <Button
          variant='ghost'
          size='sm'
          className={`p-1 hover:bg-amber-100 rounded-full transition-opacity ${
            query ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => {
            navigate('/');
            setQuery('');
          }}
        >
          <X className='w-4 h-4 text-gray-500' />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
