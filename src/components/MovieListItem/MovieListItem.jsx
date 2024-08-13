// MovieListItem.js
import React from "react";
import css from "./MovieListItem.module.css";
import StarRating from "../../components/StarRating/StarRating";

const MovieListItem = ({ title, averageVote, poster }) => {
  const defImg = "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+poster";

  return (
    <div className={css.movieListItem}>
      <img
        className={css.img}
        src={
          poster !== null ? `https://image.tmdb.org/t/p/w200${poster}` : defImg
        }
        alt={title}
      />
      <h4 className={css.h4}>{title}</h4>
      <StarRating rating={averageVote} />
    </div>
  );
};

export default MovieListItem;
