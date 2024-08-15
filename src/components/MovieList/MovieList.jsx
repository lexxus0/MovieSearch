import React from "react";
import MovieListItem from "../MovieListItem/MovieListItem";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import useFavorites from "../../services/useFavorites";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useLanguage } from "../../context/LanguageContext";

const MovieList = ({
  filteredMovies = [],
  trendingMovies = [],
  genredMovies = [],
  loadMoreMovies,
  isLoadingMore,
  hasMore,
}) => {
  const location = useLocation();
  const { t } = useLanguage();

  let movies = [];

  if (filteredMovies.length > 0) {
    movies = filteredMovies;
  } else if (location.pathname !== "/movies" && trendingMovies.length > 0) {
    movies = trendingMovies;
  } else if (genredMovies.length > 0) {
    movies = genredMovies;
  }

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!movies || movies.length === 0) {
    return <p>{t("SearchBy")}</p>;
  }

  const handleFavMovie = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <>
      <ul className={css.moviesList}>
        {movies.map((movie) => (
          <li className={css.moviesListItem} key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location.pathname }}
            >
              <MovieListItem
                title={movie.title}
                averageVote={movie.vote_average}
                poster={movie.poster_path}
                handleFavMovie={() => handleFavMovie(movie)}
                isFavorite={isFavorite(movie.id)}
              />
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <LoadMoreBtn onClick={loadMoreMovies} disabled={isLoadingMore} />
      )}
    </>
  );
};

export default MovieList;
