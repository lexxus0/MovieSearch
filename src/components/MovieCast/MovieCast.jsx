import { requestMovieCast } from "../../services/apiService";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import MovieCastItem from "../MovieCastItem/MovieCastItem";
import css from "./MovieCast.module.css";

const MovieCast = ({}) => {
  const [cast, setCast] = useState([]);
  const [castMessage, setCastMessage] = useState(false);
  const { movieId } = useOutletContext();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieCast = async () => {
      try {
        const data = await requestMovieCast(movieId);
        setCast(data.cast);
        if (data.cast.length === 0) {
          setTimeout(() => {
            setCastMessage(true);
          }, 450);
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
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
      ) : (
        castMessage && <p>No information about cast</p>
      )}

      <div></div>
    </>
  );
};

export default MovieCast;
