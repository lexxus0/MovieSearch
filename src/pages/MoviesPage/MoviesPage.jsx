import SearchMovie from "../../components/SearchMovie/SearchMovie";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = ({ onSearch, filteredMovies }) => {
  return (
    <>
      <SearchMovie onSearch={onSearch} />
      <MovieList movies={filteredMovies} />
    </>
  );
};

export default MoviesPage;
