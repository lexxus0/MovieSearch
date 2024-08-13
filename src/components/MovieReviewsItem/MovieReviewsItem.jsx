import css from "./MovieReviewsItem.module.css";

const MovieReviewsItem = ({ author, content, createdAt }) => {
  return (
    <div className={css.reviewItem}>
      <h5 className={css.author}>{author}</h5>
      <p className={css.content}>{content}</p>
      <p className={css.date}>{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default MovieReviewsItem;
