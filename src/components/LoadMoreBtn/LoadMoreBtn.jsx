import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import css from "./LoadMoreBtn.module.css";
import { useNavigate } from "react-router-dom";

const LoadMoreBtn = ({ onClick, disabled }) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className={css.container}>
      <button type="button" className={css.button} onClick={handleGoBack}>
        <GrFormPrevious />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={css.button}
      >
        <GrFormNext className={css.grFormNext} />
      </button>
    </div>
  );
};

export default LoadMoreBtn;
