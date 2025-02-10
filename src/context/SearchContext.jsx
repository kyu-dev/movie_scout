import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};