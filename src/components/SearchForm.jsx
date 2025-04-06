const SearchForm = ({ query, setQuery, type, setType, setCurrentPage }) => {
  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1); // Reset to first page when type changes
  };

  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleTypeChange("all")}
          className={`px-4 py-2 rounded-lg ${type === "all" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          All
        </button>
        <button
          onClick={() => handleTypeChange("movie")}
          className={`px-4 py-2 rounded-lg ${type === "movie" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTypeChange("series")}
          className={`px-4 py-2 rounded-lg ${type === "series" ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Series
        </button>
      </div>
    </div>
  );
};

export default SearchForm;