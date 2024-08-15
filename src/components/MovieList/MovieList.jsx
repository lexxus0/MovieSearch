import MovieListItem from "../MovieListItem/MovieListItem";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import useFavorites from "../../services/useFavorites";

const MovieList = ({ movies }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!Array.isArray(movies) || movies.length === 0) {
    return null;
  }

  const handleFavMovie = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
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
  );
};

export default MovieList;
