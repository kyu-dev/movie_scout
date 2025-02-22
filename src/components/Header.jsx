import React from "react";
import SearchBar from "./SearchBar";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 gap-4">
        {/* Logo et menu burger */}
        <div className="w-full md:w-auto flex justify-between items-center gap-7">
          <img src="/src/assets/react.svg" alt="logo" className="h-8 md:h-10" />
          <Nav />
        </div>

        {/* Barre de recherche */}
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
