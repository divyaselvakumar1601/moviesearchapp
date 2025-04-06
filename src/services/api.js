import axios from "axios";

const API_KEY = "2e6a0481";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query, type = "", page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query || "marvel", // Default to "marvel" if no query
        type: type,
        page,
        apikey: API_KEY,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "No results found");
    }

    return {
      movies: response.data.Search || [],
      totalResults: parseInt(response.data.totalResults, 10) || 0,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { 
        i: id, 
        apikey: API_KEY, 
        plot: "full" 
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Movie details not found");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};