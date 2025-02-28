import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      sessionStorage.removeItem("scrollToSection");
    }
  }, []);

  return (
    <nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-amber-50 hover:text-amber-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "container mx-auto px-4 md:flex justify-center space-x-8",
          isOpen
            ? "absolute right-0 bg-gray-900/95 backdrop-blur-sm h-full z-50 flex flex-col items-center justify-center space-x-0 space-y-10"
            : "hidden md:flex"
        )}
      >
        <button
          onClick={() => handleScrollToSection("popular")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium text-left md:text-center"
          )}
        >
          Populaires
        </button>
        <button
          onClick={() => handleScrollToSection("top-rated")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium text-left md:text-center"
          )}
        >
          Les Mieux Notés
        </button>
        <button
          onClick={() => handleScrollToSection("recommendations")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium text-left md:text-center"
          )}
        >
          Vos Recommandations
        </button>
      </div>
    </nav>
  );
};

export default Nav;
