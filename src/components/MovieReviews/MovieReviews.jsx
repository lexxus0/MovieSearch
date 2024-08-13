import { requestMovieReviews } from "../../services/apiService";
import { useState, useEffect } from "react";
import MovieReviewsItem from "../MovieReviewsItem/MovieReviewsItem";
import css from "./MovieReviews.module.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieReviews = async () => {
      try {
        const data = await requestMovieReviews(movieId);
        const reviewsData = Array.isArray(data.results) ? data.results : [];
        setReviews(reviewsData);
      } catch (e) {
        console.error(e.message);
        setReviews([]);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <ul className={css.reviewsList}>
      {reviews.map((item) => (
        <li className={css.reviewItem} key={item.id}>
          <MovieReviewsItem
            author={item.author}
            content={item.content}
            createdAt={item.created_at}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
