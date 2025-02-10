import React from "react";
import { useNavigate } from "react-router-dom";
import SearchContainer from "../components/SearchContainer";

const Search = () => {
  const navigate = useNavigate();

  return (
    <>
      <SearchContainer />
    </>
  );
};

export default Search;