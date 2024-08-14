// MovieListItem.js
import React from "react";
import css from "./MovieListItem.module.css";
import StarRating from "../../components/StarRating/StarRating";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const MovieListItem = ({
  title,
  averageVote,
  poster,
  handleFavMovie,
  isFavorite,
}) => {
  const defImg = "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

  return (
    <div className={css.movieListItem}>
      <div className={css.posterWrapper}>
        <img
          className={css.img}
          src={
            poster !== null
              ? `https://image.tmdb.org/t/p/w200${poster}`
              : defImg
          }
          alt={title}
        />
        <button className={css.favBtn} onClick={() => handleFavMovie(title)}>
          {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
        </button>
      </div>
      <h4 className={css.h4}>{title}</h4>
      <StarRating rating={averageVote} />
    </div>
  );
};

export default MovieListItem;
