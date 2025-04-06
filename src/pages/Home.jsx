import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        const { movies: defaultMovies } = await fetchMovies("marvel", "all");
        setMovies(defaultMovies);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!query) fetchDefaultMovies();
  }, [query]);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length > 2 || !query) {
        setLoading(true);
        try {
          const { movies: fetchedMovies, totalResults: fetchedTotal } = await fetchMovies(
            query || "marvel",
            type !== "all" ? type : "",
            currentPage
          );
          setMovies(fetchedMovies);
          setTotalResults(fetchedTotal);
          setError("");
        } catch (err) {
          setError(err.message);
          setMovies([]);
          setTotalResults(0);
        } finally {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [query, type, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">🎬 Movie Search</h1>
      
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-70 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setType("all")}
            className={`px-4 py-2 rounded-lg transition ${type === "all" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setType("movie")}
            className={`px-4 py-2 rounded-lg transition ${type === "movie" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Movies
          </button>
          <button
            onClick={() => setType("series")}
            className={`px-4 py-2 rounded-lg transition ${type === "series" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Series
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-3">{error}</p>}

      <MovieList movies={movies} />
      
      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;