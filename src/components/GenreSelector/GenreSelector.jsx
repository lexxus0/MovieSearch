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
        />
      )}
    </div>
  );
};

export default GenreSelector;
