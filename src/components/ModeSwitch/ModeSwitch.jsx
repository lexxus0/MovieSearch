import { useEffect, useState } from "react";
import css from "./ModeSwitch.module.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setDarkMode(storedMode === "dark");
      document.documentElement.setAttribute("data-theme", storedMode);
    }
  }, []);

  const toggleMode = (checked) => {
    const newMode = checked ? "dark" : "light";
    setDarkMode(checked);
    document.documentElement.setAttribute("data-theme", newMode);

    localStorage.setItem("mode", newMode);
  };

  return (
    <div className={css.toggleMode}>
      <DarkModeSwitch checked={darkMode} onChange={toggleMode} size={30} />
    </div>
  );
};

export default ModeSwitch;
