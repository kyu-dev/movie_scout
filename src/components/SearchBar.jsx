import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/api";
import { useSearchStore } from "../store";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SearchBar = () => {
  const { query, setQuery, setMovies, setLoading } = useSearchStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null)

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
        if (result && Array.isArray(result.results)) {
          setMovies(result.results);
        } else {
          throw new Error("Format de réponse inattendu de l'API");
        }
        navigate("/search");
      } catch (err) {
        setError("Erreur lors de la récupération des films");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, navigate, setMovies, setLoading, setError]);

  return (
    <div className="bg-amber-50 w-full md:w-fit px-4 md:px-6 py-2 rounded-3xl">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Rechercher un film"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigate("/");
              setQuery("");
            }}
          >
            X
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
