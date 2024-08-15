import css from "./GenreSelector.module.css";
import { useLanguage } from "../../context/LanguageContext";

const GenreSelector = ({ genres, selectedGenre, onGenreChange }) => {
  const { t } = useLanguage();
  return (
    <div className={css.genreSelector}>
      <label htmlFor="genre">{t("SelectGenre")}</label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="-">-</option>
        <option value="">{t("AllGenres")}</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
