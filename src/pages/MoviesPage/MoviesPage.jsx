import SearchedList from "../../components/SearchedList/SearchedList";
import SearchMovie from "../../components/SearchMovie/SearchMovie";

const MoviesPage = ({ onSearch, filteredMovies }) => {
  return (
    <>
      <SearchMovie onSearch={onSearch} />
      <SearchedList filteredMovies={filteredMovies} />
    </>
  );
};

export default MoviesPage;
