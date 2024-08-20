import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { useLanguage } from "../../context/LanguageContext";
import { requestTrendingMovies } from "../../services/apiService";
import Loader from "../../components/Loader/Loader";
import { useLocation, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const { t, language } = useLanguage();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
        setError(e.message);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchTrendingData();
  }, [language, page]);

  if (error) {
    return (
      <p>
        {t("ErrorLoadingMovies")}: {error}
      </p>
    );
  }

  return (
    <header>
      <div>
        <h1 className={css.mainH}>{t("Trending Today")}</h1>
        {isLoadingMore && page === 1 ? (
          <Loader />
        ) : (
          <MovieList
            trendingMovies={trendingMovies}
            loadMoreMovies={loadMoreMovies}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        )}
      </div>
    </header>
  );
};

export default HomePage;
