import css from "./GenreSelector.module.css";
import { useLanguage } from "../../context/LanguageContext";
import Select from "react-select";
import { VscListFilter } from "react-icons/vsc";
import { useState } from "react";

const GenreSelector = ({ genres, selectedGenre, onGenreChange }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => setIsOpen(!isOpen);

  const options = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const theme = document.documentElement.getAttribute("data-theme") || "light";

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      borderColor: theme === "dark" ? "#555" : "#ccc",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#444"
          : "#eee"
        : theme === "dark"
        ? "#333"
        : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#fff" : "#000",
    }),
  };

  return (
    <div className={css.genreSelector}>
      <VscListFilter onClick={toggleSelect} className={css.filterIcon} />
      {isOpen && (
        <Select
          className={css.genreSelect}
          id="genre"
          value={options.find((option) => option.value === selectedGenre)}
          onChange={(selectedOption) => {
            onGenreChange(selectedOption.value);
            setIsOpen(false);
          }}
          options={options}
          placeholder={t("AllGenres")}
          menuIsOpen={true}
          styles={customStyles}
        />
      )}
    </div>
  );
};

export default GenreSelector;
