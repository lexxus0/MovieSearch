import { Field, Formik, Form } from "formik";

const SearchMovie = ({ onSearch }) => {
  return (
    <div>
      <Formik
        initialValues={{ searchedValue: "" }}
        onSubmit={(values, actions) => {
          const trimmedSearchedValue = values.searchedValue.trim();

          if (trimmedSearchedValue === "") {
            console.error("Please enter a value to search images!");
            return;
          }
          onSearch(trimmedSearchedValue);
        }}
      >
        <Form>
          <Field
            type="text"
            name="searchedValue"
            autoComplete="on"
            autoFocus
            placeholder="Search the movie"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchMovie;
