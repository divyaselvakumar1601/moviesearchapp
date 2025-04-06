/* Updated MovieList.jsx */
import MovieCard from "../components/MovieCard";
import "../styles/MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};
export default MovieList;