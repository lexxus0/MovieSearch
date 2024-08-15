// TOAST

import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import css from "./SearchMovie.module.css";
import { MdSearch } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";

const SearchMovie = ({ onSearch }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className={css.searchHead}>
      <Formik
        initialValues={{ searchedValue: "" }}
        onSubmit={(values, actions) => {
          const trimmedSearchedValue = values.searchedValue.trim();

          if (trimmedSearchedValue === "") {
            console.error("Please enter a value to search movies!");
            return;
          }

          onSearch(trimmedSearchedValue);
          navigate(`/movies?query=${encodeURIComponent(trimmedSearchedValue)}`);
          actions.resetForm();
        }}
      >
        <Form className={css.searchForm}>
          <Field
            type="text"
            className={css.searchField}
            name="searchedValue"
            autoComplete="on"
            autoFocus
            placeholder={t("SearchPlaceholder")}
          />
          <button className={css.searchBtn} type="submit">
            <MdSearch />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchMovie;
