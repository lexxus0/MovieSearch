import {
  useParams,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import { requestFullPageMovies } from "../../services/apiService";
import MovieCast from "../../components/MovieCast/MovieCast";
import Loader from "../../components/Loader/Loader";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import StarRating from "../../components/StarRating/StarRating";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [fullPageMovie, setFullPageMovie] = useState(null);
  const [activeComponent, setActiveComponent] = useState("");

  const defImg = "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieById = async () => {
      try {
        const data = await requestFullPageMovies(movieId);
        setFullPageMovie(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchMovieById();
  }, [movieId]);

  const handleToggleComponent = (componentName) => {
    const currentQuery = location.search;

    if (activeComponent === componentName) {
      setActiveComponent("");
      navigate(`/movies/${movieId}?${currentQuery}`);
    } else {
      setActiveComponent(componentName);
      navigate(`/movies/${movieId}/${componentName}?${currentQuery}`);
    }
  };

  if (!fullPageMovie) {
    return <Loader />;
  }

  const releaseDate = fullPageMovie.release_date;
  const releaseYear = releaseDate ? releaseDate.split("-")[0] : "Unknown Year";

  return (
    <div className={css.container}>
      <GoBackBtn />
      <div className={css.content}>
        <div className={css.imageSection}>
          <img
            className={css.movieImg}
            src={
              fullPageMovie.poster_path
                ? `https://image.tmdb.org/t/p/w300${fullPageMovie.poster_path}`
                : defImg
            }
            alt={fullPageMovie.title}
          />
          <p className={css.movieTagline}>{fullPageMovie.tagline}</p>
        </div>
        <div className={css.detailsSection}>
          <h2 className={css.movieName}>
            {fullPageMovie.title} ({releaseYear})
          </h2>
          <p className={css.movieOverview}>{fullPageMovie.overview}</p>
          <h3 className={css.movieRating}>Rating:</h3>
          <StarRating rating={fullPageMovie.vote_average} />
          <h3 className={css.movieGenres}>Genres:</h3>
          <p className={css.movieGenresList}>
            {fullPageMovie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div>
        <button
          className={css.button}
          onClick={() => handleToggleComponent("cast")}
        >
          {activeComponent === "cast" ? "Hide Cast" : "Movie Cast"}
        </button>
        <button
          className={css.button}
          onClick={() => handleToggleComponent("reviews")}
        >
          {activeComponent === "reviews" ? "Hide Reviews" : "Movie Reviews"}
        </button>
      </div>
      <Routes>
        {activeComponent === "cast" && (
          <Route path="cast" element={<MovieCast movieId={movieId} />} />
        )}
        {activeComponent === "reviews" && (
          <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
        )}
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
