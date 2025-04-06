import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { fetchMovieDetails } from "../services/api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || "[]");
        
        // Fetch full details for each favorite
        const favoritesWithDetails = await Promise.all(
          favoritesFromStorage.map(async (id) => {
            try {
              return await fetchMovieDetails(id);
            } catch (err) {
              console.error(`Error fetching details for movie ${id}:`, err);
              return null;
            }
          })
        );

        setFavorites(favoritesWithDetails.filter(movie => movie !== null));
      } catch (err) {
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">⭐ Your Favorites</h1>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {favorites.length === 0 ? (
        <p className="text-center text-xl mt-8">No favorites yet. Add some movies from the search page!</p>
      ) : (
        <MovieList movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;