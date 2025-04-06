/* Updated SearchForm.jsx */
import { useState } from "react";
import "../styles/SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <div className="search-header">
      <h1 className="search-title">Movie Search App</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="search-dropdown"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;