import MovieListItem from "../MovieListItem/MovieListItem";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return null;
  }
  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
            <MovieListItem
              title={movie.title}
              averageVote={movie.vote_average}
              poster={movie.poster_path}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
