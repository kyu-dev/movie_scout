import React, { useContext } from 'react';
import SearchResults from './SearchResults';
import { SearchContext } from '../context/SearchContext';

const SearchContainer = () => {
  const { movies, loading, error } = useContext(SearchContext);

  return (
    <>
      <SearchResults
        loading={loading}
        error={error}
        movies={movies}
      />
    </>
  );
};

export default SearchContainer;