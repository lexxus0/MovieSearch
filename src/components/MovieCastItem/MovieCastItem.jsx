import css from "./MovieCastItem.module.css";

const MovieCastItem = ({ realName, profile, character }) => {
  const defaultProfileImg =
    "https://dummyimage.com/80x120/cdcdcd/000.jpg&text=No+Image";

  return (
    <div className={css.castItem}>
      <img
        className={css.profileImg}
        src={
          profile
            ? `https://image.tmdb.org/t/p/w200${profile}`
            : defaultProfileImg
        }
        alt={realName}
      />
      <div className={css.castDetails}>
        <span className={css.realName}>{realName}</span>
        <span className={css.character}>Character: {character}</span>
      </div>
    </div>
  );
};

export default MovieCastItem;
