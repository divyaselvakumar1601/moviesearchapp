
/* MovieCard.jsx using plain CSS */
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-link">
        <img 
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
          alt={movie.Title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.Title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{movie.Year}</span>
            <span className="movie-type">{movie.Type}</span>
          </div>
        </div>
      </Link>
      <div className="movie-fav-btn">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;
