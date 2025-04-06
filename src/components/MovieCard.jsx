import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Link to={`/movie/${movie.imdbID}`} className="flex-grow">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
          alt={movie.Title}
          className="w-full h-72 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{movie.Title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-sm">{movie.Year}</span>
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              {movie.Type}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;