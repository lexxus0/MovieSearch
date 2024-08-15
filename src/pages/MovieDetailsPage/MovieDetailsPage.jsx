import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import { requestFullPageMovies } from "../../services/apiService";
import Loader from "../../components/Loader/Loader";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import StarRating from "../../components/StarRating/StarRating";
import { useLanguage } from "../../context/LanguageContext";

import clsx from "clsx";

const MovieDetailsPage = () => {
  const { t, language } = useLanguage();
  const { movieId } = useParams();
  // const navigate = useNavigate();
  const [fullPageMovie, setFullPageMovie] = useState(null);

  const defImg = "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieById = async () => {
      try {
        const data = await requestFullPageMovies(movieId, language);
        setFullPageMovie(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchMovieById();
  }, [movieId, language]);

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
          <h3 className={css.movieRating}>{t("Rating")}:</h3>
          <StarRating rating={fullPageMovie.vote_average} />
          <h3 className={css.movieGenres}>{t("Genres")}:</h3>
          <p className={css.movieGenresList}>
            {fullPageMovie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div className={css.navLinks}>
        <NavLink
          to="cast"
          className={({ isActive }) =>
            clsx(css.link, isActive && css.activeLink)
          }
        >
          {t("MovieCast")}
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            clsx(css.link, isActive && css.activeLink)
          }
        >
          {t("MovieReviews")}
        </NavLink>
      </div>
      <div>
        <Outlet context={{ movieId }} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
