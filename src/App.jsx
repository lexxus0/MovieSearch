import css from "./App.module.css";
import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState, useParams } from "react";
import {
  requestTrendingMovies,
  requestSearchedMovies,
} from "./services/apiService";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
import Loader from "./components/Loader/Loader";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <nav className={css.navigation}>
          <NavLink className={css.navLink} to="/">
            Home
          </NavLink>
          <NavLink className={css.navLink} to="/movies">
            Movies
          </NavLink>
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
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
