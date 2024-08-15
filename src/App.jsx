import css from "./App.module.css";
import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./context/LanguageContext";

import {
  requestTrendingMovies,
  requestSearchedMovies,
} from "./services/apiService";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
import Loader from "./components/Loader/Loader";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";
import ModeSwitch from "./components/ModeSwitch/ModeSwitch";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { t, changeLanguage, language } = useLanguage();

  useEffect(() => {
    if (!searchValue) return;

    const fetchMoviesBySearchQuery = async () => {
      try {
        const data = await requestSearchedMovies(searchValue, language);
        setFilteredMovies(data.results);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMoviesBySearchQuery();
  }, [searchValue, language]);

  const onSearch = (searchedValue) => {
    setSearchValue(searchedValue);
  };

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await requestTrendingMovies(language);
        setTrendingMovies(data.results);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchTrendingData();
  }, [language]);

  return (
    <Suspense fallback={<Loader />}>
      <header>
        <nav className={css.navigation}>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, isActive && css.activeLink)
            }
            to="/"
          >
            <IoHome />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, isActive && css.activeLink)
            }
            to="/movies"
          >
            {t("Movies")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, isActive && css.activeLink)
            }
            to="/favorites"
          >
            {t("Favorites")}
          </NavLink>
          <ModeSwitch />
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("ua")}>Українська</button>
        </nav>
      </header>
      <main>
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
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Suspense>
  );
}

export default App;
