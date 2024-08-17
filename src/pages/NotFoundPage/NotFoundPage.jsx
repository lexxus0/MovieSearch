import css from "./NotFoundPage.module.css";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/");

  return (
    <div>
      <Link to={backLinkRef.current}>
        <GoBackBtn />
      </Link>
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
