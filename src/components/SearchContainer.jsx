import React from "react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "../store";

const SearchContainer = () => {
  const { movies, loading, error } = useSearchStore();

  return (
    <>
      <SearchResults loading={loading} error={error} movies={movies} />
    </>
  );
};

export default SearchContainer;
