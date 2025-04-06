// src/components/FavoriteButton.jsx
import { useEffect, useState } from "react";

const FavoriteButton = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== movie.imdbID);
    } else {
      favorites = [...favorites, movie.imdbID];
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded-lg transition ${isFavorite ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600"}`}
    >
      {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;