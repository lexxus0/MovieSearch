import MovieListItem from "../MovieListItem/MovieListItem";

const SearchedList = ({ filteredMovies }) => {
  if (!Array.isArray(filteredMovies) || filteredMovies.length === 0) {
    return;
  }

  return (
    <ul>
      {filteredMovies.map((movie) => (
        <li key={movie.id}>
          <MovieListItem
            title={movie.title}
            averageVote={movie.vote_average}
            poster={movie.poster_path}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchedList;
