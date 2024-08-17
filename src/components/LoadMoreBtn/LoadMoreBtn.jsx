import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import css from "./LoadMoreBtn.module.css";
import { useNavigate } from "react-router-dom";

const LoadMoreBtn = ({ onClick, disabled }) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className={css.container}>
      <button type="button" className={css.button1} onClick={handleGoBack}>
        <GrFormPrevious className={css.grFormPrevious} />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={css.button2}
      >
        <GrFormNext className={css.grFormNext} />
      </button>
    </div>
  );
};

export default LoadMoreBtn;
