const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
