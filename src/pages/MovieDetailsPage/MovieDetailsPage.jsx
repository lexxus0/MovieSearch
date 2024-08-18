import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useState, useEffect, useRef } from "react";
import {
  requestFullPageMovies,
  requestMovieTrailers,
} from "../../services/apiService";
import Loader from "../../components/Loader/Loader";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import StarRating from "../../components/StarRating/StarRating";
import { useLanguage } from "../../context/LanguageContext";

import clsx from "clsx";

const MovieDetailsPage = () => {
  const { t, language } = useLanguage();
  const { movieId } = useParams();
  const [fullPageMovie, setFullPageMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cachedTrailers, setCachedTrailers] = useState({});

  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const defImg = "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        const data = await requestFullPageMovies(movieId, language);
        setFullPageMovie(data);

        const releaseDate = data.release_date;
        const releaseYear = releaseDate
          ? releaseDate.split("-")[0]
          : "Unknown Year";

        // Check if trailers are cached
        if (cachedTrailers[movieId]) {
          setTrailer(cachedTrailers[movieId]);
        } else {
          // Fetch trailers
          const trailerData = await requestMovieTrailers(
            data.title,
            releaseYear
          );
          setTrailer(trailerData);
          setCachedTrailers((prev) => ({ ...prev, [movieId]: trailerData }));
        }
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchMovieData();
  }, [movieId, language, cachedTrailers]);

  if (!fullPageMovie) {
    return <Loader />;
  }

  const goBack = () => {
    navigate(-1);
  };

  const releaseDate = fullPageMovie.release_date;
  const releaseYear = releaseDate ? releaseDate.split("-")[0] : "Unknown Year";

  return (
    <div className={css.container}>
      <div>
        <Link to={backLinkRef.current}>
          <GoBackBtn onClick={goBack} />
        </Link>
      </div>

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

          <div className={css.trailersWrapper}>
            <h3 className={css.watchTrailer}>{t("WatchTrailer")}</h3>
            <div className={css.trailers}>
              {trailer && (
                <iframe
                  key={trailer.id.videoId}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.id.videoId}`}
                  title={trailer.snippet.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
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
