import React from "react";
import { Link } from "react-router-dom";
import MovieListItem from "../../components/MovieListItem/MovieListItem";
import useFavorites from "../../services/useFavorites";
import css from "./FavoritesPage.module.css";
import { useLanguage } from "../../context/LanguageContext";

const FavoritesPage = () => {
  const { t } = useLanguage();
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  return (
    <>
      <h2>{t("Favorite Movies")}</h2>
      {favorites.length > 0 ? (
        <ul className={css.moviesFavList}>
          {favorites.map((movie) => (
            <li className={css.moviesFavListItem} key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname }}
              >
                <MovieListItem
                  title={movie.title}
                  averageVote={movie.vote_average}
                  poster={movie.poster_path}
                  handleFavMovie={() => handleRemoveFavorite(movie.id)}
                  isFavorite={true}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("FavoriteMessage")}</p>
      )}
    </>
  );
};

export default FavoritesPage;
