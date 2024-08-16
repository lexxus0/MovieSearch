import Select from "react-select";
import { useLanguage } from "../../context/LanguageContext";
import "country-flag-icons/react/3x2";
import css from "./LangSelector.module.css";

import { GB, UA } from "country-flag-icons/react/3x2";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: 100,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: state.selectProps.menuIsOpen
      ? state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"
      : state.selectProps.theme === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.05)",
    borderColor: state.isFocused
      ? state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)"
      : state.selectProps.theme === "dark"
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(0, 0, 0, 0.2)",
    color: state.selectProps.theme === "dark" ? "#ffffff" : "#000000",
    boxShadow: "none",
    "&:hover": {
      borderColor:
        state.selectProps.theme === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: state.selectProps.theme === "dark" ? "#ffffff" : "#000000",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: state.isFocused
      ? state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"
      : "transparent",
    color:
      state.isSelected || state.selectProps.theme === "dark"
        ? "#ffffff"
        : "#000000",
    "&:hover": {
      backgroundColor:
        state.selectProps.theme === "dark"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.2)",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 5,
    backgroundColor: state.selectProps.theme === "dark" ? "#333" : "#fff",
    color: state.selectProps.theme === "dark" ? "#ffffff" : "#000000",
    boxShadow:
      state.selectProps.theme === "dark"
        ? "0 4px 8px rgba(0, 0, 0, 0.3)"
        : "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color:
      state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color:
      state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.selectProps.theme === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)",
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
