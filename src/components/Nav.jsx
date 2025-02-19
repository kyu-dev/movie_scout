import React from "react";
import { cn } from "@/lib/utils"; // Pour gérer les classes conditionnelles
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    // Si on est sur une autre page que l'accueil, on navigue sans recharger
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    // Si on est déjà sur la page d'accueil, fait défiler immédiatement
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
      <div className="container mx-auto px-4 flex justify-center space-x-8">
        <button
          onClick={() => handleScrollToSection("popular")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium"
          )}
        >
          Populaires
        </button>
        <button
          onClick={() => handleScrollToSection("top-rated")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium"
          )}
        >
          Les Mieux Notés
        </button>
        <button
          onClick={() => handleScrollToSection("recommendations")}
          className={cn(
            "text-amber-50 hover:text-amber-200 transition-colors duration-300 text-lg font-medium"
          )}
        >
          Vos Recommandations
        </button>
      </div>
    </nav>
  );
};

export default Nav;
