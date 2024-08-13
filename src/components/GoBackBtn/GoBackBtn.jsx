import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import css from "./GoBackBtn.module.css";

const GoBackBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search;
  const goBackLink = location.state?.from
    ? location.state.from + query
    : `/movies${query}`;

  return (
    <button
      type="button"
      onClick={() => navigate(goBackLink)}
      className={css.goBackButton}
    >
      <IoMdArrowRoundBack className={css.goBackIcon} />
    </button>
  );
};

export default GoBackBtn;
