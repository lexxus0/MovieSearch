import MovieListItem from "../MovieListItem/MovieListItem";

const MovieList = ({ trendingMovies }) => {
  return (
    <ul>
      {trendingMovies.map((movie) => (
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

export default MovieList;
