import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { useLanguage } from "../../context/LanguageContext";

const HomePage = ({
  trendingMovies,
  loadMoreMovies,
  isLoadingMore,
  hasMore,
}) => {
  const { t } = useLanguage();

  return (
    <header>
      <div>
        <h1 className={css.mainH}>{t("Trending Today")}</h1>
        <MovieList
          trendingMovies={trendingMovies}
          loadMoreMovies={loadMoreMovies}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
        />
      </div>
    </header>
  );
};

export default HomePage;
