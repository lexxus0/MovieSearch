import { requestMovieReviews } from "../../services/apiService";
import { useState, useEffect } from "react";
import MovieReviewsItem from "../MovieReviewsItem/MovieReviewsItem";
import css from "./MovieReviews.module.css";
import { useOutletContext } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useOutletContext();
  const [reviewsMessage, setReviewsMessage] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieReviews = async () => {
      try {
        const data = await requestMovieReviews(movieId);
        const reviewsData = Array.isArray(data.results) ? data.results : [];
        setReviews(reviewsData);
        if (reviewsData.length === 0) {
          setTimeout(() => {
            setReviewsMessage(true);
          }, 300);
        }
      } catch (e) {
        console.error(e.message);
        setReviews([]);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
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
      ) : (
        reviewsMessage && <p>{t("ReviewsMessage")}</p>
      )}
    </div>
  );
};

export default MovieReviews;
