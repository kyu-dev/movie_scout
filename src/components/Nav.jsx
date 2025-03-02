import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    navigate("/", { state: { scrollTo: section } });
    setIsOpen(false);
  };

  return (
    <nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-amber-50 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
      >
        {isOpen ? (
          <X
            size={28}
            className="transition-transform duration-300 ease-in-out"
          />
        ) : (
          <Menu
            size={28}
            className="transition-transform duration-300 ease-in-out"
          />
        )}
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-amber-50 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
        >
          <X size={28} />
        </button>

        <div className="container mx-auto h-full flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => handleSectionClick("popular")}
            className="text-amber-50 hover:text-blue-300 text-2xl font-medium transition-colors duration-300"
          >
            Populaires
          </button>
          <button
            onClick={() => handleSectionClick("top-rated")}
            className="text-amber-50 hover:text-blue-300 text-2xl font-medium transition-colors duration-300"
          >
            Les Mieux Notés
          </button>
          <Link
            to="/favorites"
            className="text-amber-50 hover:text-blue-300 text-2xl font-medium transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Favoris
          </Link>
        </div>
      </div>

      <div className="hidden md:flex container mx-auto px-4 justify-center space-x-8">
        <button
          onClick={() => handleSectionClick("popular")}
          className="text-amber-50 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
        >
          Populaires
        </button>
        <button
          onClick={() => handleSectionClick("top-rated")}
          className="text-amber-50 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
        >
          Les Mieux Notés
        </button>
        <Link
          to="/favorites"
          className="text-amber-50 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Favoris
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
