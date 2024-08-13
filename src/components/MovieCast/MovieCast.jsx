import { requestMovieCast } from "../../services/apiService";
import { useState, useEffect } from "react";
import MovieCastItem from "../MovieCastItem/MovieCastItem";
import css from "./MovieCast.module.css";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieCast = async () => {
      try {
        const data = await requestMovieCast(movieId);
        setCast(data.cast);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {cast.map((item) => (
        <li className={css.castListItem} key={item.id}>
          <MovieCastItem
            realName={item.name}
            character={item.character}
            profile={item.profile_path}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
