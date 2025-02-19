import React from "react";
import SearchBar from "./SearchBar";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-gray-900 flex justify-between items-center px-10 py-2">
      <img src="/src/assets/react.svg" alt="logo" />
      <Nav />
      <SearchBar />
    </header>
  );
};

export default Header;
