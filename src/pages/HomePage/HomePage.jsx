import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ trendingMovies }) => {
  return (
    <header>
      <div>
        <h2>Trending today</h2>
        <MovieList trendingMovies={trendingMovies} />
      </div>
    </header>
  );
};

export default HomePage;
