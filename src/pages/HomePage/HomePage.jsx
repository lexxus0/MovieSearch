import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = ({ trendingMovies }) => {
  return (
    <header>
      <div>
        <h1 className={css.mainH}>Trending today</h1>
        <MovieList movies={trendingMovies} />
      </div>
    </header>
  );
};

export default HomePage;
