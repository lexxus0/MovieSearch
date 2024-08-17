import css from "./App.module.css";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { IoHome } from "react-icons/io5";
import clsx from "clsx";
import { useLanguage } from "./context/LanguageContext";
import LangSelector from "./components/LangSelector/LangSelector";
import { useSearchParams } from "react-router-dom";

import { requestTrendingMovies } from "./services/apiService";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasMore, setHasMore] = useState(false);

  const { t, language } = useLanguage();

  const location = useLocation();

  const loadMoreMovies = async () => {
    if (page < totalPages) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);

      setSearchParams({ page: nextPage });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get("page") || "1", 10);
    setPage(currentPage);
  }, [location.search]);

  useEffect(() => {
    const handlePageChange = () => {
      const params = new URLSearchParams(location.search);
      const currentPage = parseInt(params.get("page") || "1", 10);
      setPage(currentPage);
    };

    handlePageChange();
  }, [location.search]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await requestTrendingMovies(language, page);
        setTrendingMovies((prevMovies) =>
          page !== null ? data.results : [...prevMovies, ...data.results]
        );
        setTotalPages(data.total_pages);
        setHasMore(page < data.total_pages);
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
          <div className={css.rightSection}>
            <ModeSwitch />
            <LangSelector />
          </div>
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
                hasMore={hasMore}
              />
            }
          />
          <Route path="/movies" element={<MoviesPage />} />
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
};

export default App;
