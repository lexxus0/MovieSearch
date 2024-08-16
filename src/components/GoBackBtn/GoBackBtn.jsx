import { IoMdArrowRoundBack } from "react-icons/io";
import css from "./GoBackBtn.module.css";

const GoBackBtn = () => {
  return (
    <button type="button" className={css.goBackButton}>
      <IoMdArrowRoundBack className={css.goBackIcon} />
    </button>
  );
};

export default GoBackBtn;
