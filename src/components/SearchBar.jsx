import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/api";
import { useSearchStore } from "../store";

const SearchBar = () => {
  const { query, setQuery, setMovies, setLoading, setError } = useSearchStore();
  const navigate = useNavigate();

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
        setMovies(result);
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
    <div className="py-4 bg-blue-300">
      <div className="bg-amber-50 w-fit px-6 py-2 rounded-3xl">
        <input
          type="text"
          placeholder="Rechercher un film"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => {
              navigate("/"), setQuery("");
            }}
            className="back-button"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
