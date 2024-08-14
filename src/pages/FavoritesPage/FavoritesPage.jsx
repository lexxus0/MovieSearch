import MovieListItem from "../../components/MovieListItem/MovieListItem";
import useFavorites from "../../services/useFavorites";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favorites.length > 0 ? (
        <ul className={css.movieList}>
          {favorites.map((movie) => (
            <li className={css.movieListItem} key={movie.id}>
              <MovieListItem
                title={movie.title}
                averageVote={movie.vote_average}
                poster={movie.poster_path}
                handleFavMovie={() => handleRemoveFavorite(movie.id)}
                isFavorite={true}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
