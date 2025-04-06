import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/api"; // Correct import
import FavoriteButton from "../components/FavoriteButton";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">
          ← Back to Search
        </Link>

        {movie && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
                alt={movie.Title}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4 flex justify-center">
                <FavoriteButton movie={movie} />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-4xl font-bold mb-2">
                {movie.Title} ({movie.Year})
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.Genre?.split(",").map((genre) => (
                  <span
                    key={genre}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-lg">
                    <strong>Director:</strong> {movie.Director}
                  </p>
                  <p className="text-lg">
                    <strong>Actors:</strong> {movie.Actors}
                  </p>
                  <p className="text-lg">
                    <strong>Runtime:</strong> {movie.Runtime}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <strong>IMDB Rating:</strong> {movie.imdbRating}/10
                  </p>
                  <p className="text-lg">
                    <strong>Language:</strong> {movie.Language}
                  </p>
                  <p className="text-lg">
                    <strong>Country:</strong> {movie.Country}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Plot</h3>
                <p className="text-lg">{movie.Plot}</p>
              </div>

              {movie.Ratings?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Ratings</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.Ratings.map((rating) => (
                      <div
                        key={rating.Source}
                        className="bg-gray-800 p-3 rounded-lg"
                      >
                        <p className="font-bold">{rating.Source}</p>
                        <p>{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;