import "./App.css";

import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  requestTrendingMovies,
  requestSearchedMovies,
  requestFullPageMovies,
} from "./services/apiService";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await requestTrendingMovies();
        setTrendingMovies(data.results);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchTrendingData();
  }, []);

  useEffect(() => {
    if (!searchValue) return;

    const fetchMoviesBySearchQuery = async () => {
      try {
        const data = await requestSearchedMovies(searchValue);
        setFilteredMovies(data.results);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (searchValue) {
      fetchMoviesBySearchQuery();
    }
  }, [searchValue]);

  const onSearch = (searchedValue) => {
    setSearchValue(searchedValue);
    setFilteredMovies([]);
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<HomePage trendingMovies={trendingMovies} />}
        />
        <Route
          path="/movies"
          element={
            <MoviesPage onSearch={onSearch} filteredMovies={filteredMovies} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
