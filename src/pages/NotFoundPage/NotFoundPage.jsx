import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <GoBackBtn />
      <div className={css.container}>
        <h1 className={css.title}>404</h1>
        <p className={css.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
