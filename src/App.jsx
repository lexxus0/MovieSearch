import css from "./App.module.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import clsx from "clsx";
import { useLanguage } from "./context/LanguageContext";
import LangSelector from "./components/LangSelector/LangSelector";

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

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { t, language } = useLanguage();
  const navigate = useNavigate();

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

  const loadMoreMovies = async () => {
    if (page < totalPages) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      navigate(`/page/${nextPage}`);
    }
  };

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await requestTrendingMovies(language, page);
        setTrendingMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchTrendingData();
  }, [language, page]);

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
          <LangSelector />
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                trendingMovies={trendingMovies}
                loadMoreMovies={loadMoreMovies}
                isLoadingMore={isLoadingMore}
                hasMore={page < totalPages}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <MoviesPage
                onSearch={onSearch}
                filteredMovies={filteredMovies}
                searchValue={searchValue}
                setFilteredMovies={setFilteredMovies}
              />
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route
            path="/page/:pageNumber"
            element={
              <HomePage
                trendingMovies={trendingMovies}
                loadMoreMovies={loadMoreMovies}
                isLoadingMore={isLoadingMore}
                hasMore={page < totalPages}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Suspense>
  );
};

export default App;
