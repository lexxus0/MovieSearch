import Select from "react-select";
import { useLanguage } from "../../context/LanguageContext";
import "country-flag-icons/react/3x2";
import css from "./LangSelector.module.css";

import { GB, UA } from "country-flag-icons/react/3x2";

const customStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: 100,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 5,
  }),
};

const LangSelector = () => {
  const { changeLanguage, language } = useLanguage();

  const options = [
    { value: "en", label: <GB title="English" className={css.flagIcon} /> },
    { value: "ua", label: <UA title="Українська" className={css.flagIcon} /> },
  ];

  const handleChange = (selectedOption) => {
    changeLanguage(selectedOption.value);
  };

  return (
    <Select
      value={options.find((option) => option.value === language)}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

const CustomSingleValue = ({ data }) => <div>{data.label}</div>;

export default LangSelector;
