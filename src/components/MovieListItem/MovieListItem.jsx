const MovieListItem = ({ title, averageVote, poster }) => {
  return (
    <>
      <img src={`https://image.tmdb.org/t/p/w200${poster}`} alt="{title}" />
      <h4>{title}</h4>
      <p>{averageVote}</p>
    </>
  );
};

export default MovieListItem;
