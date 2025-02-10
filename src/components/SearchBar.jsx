import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import { SearchContext } from '../context/SearchContext';

const SearchBar = () => {
  const { query, setQuery, setMovies, setLoading, setError } = useContext(SearchContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!query) {
      setMovies([]);
      navigate("/");
      return;

    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMovies(query);
        setMovies(result);
        navigate('/search');
      } catch (err) {
        setError('Erreur lors de la récupération des films');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un film"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (<button
        onClick={() => {
          navigate("/"),
          setQuery("")
        }}
        className="back-button">
        X
      </button>)}
    </div>
  );
};

export default SearchBar;