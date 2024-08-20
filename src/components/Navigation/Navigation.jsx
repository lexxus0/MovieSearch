import { NavLink } from "react-router-dom";
import clsx from "clsx";
import ModeSwitch from "../ModeSwitch/ModeSwitch";
import LangSelector from "../LangSelector/LangSelector";
import css from "./Navigation.module.css";
import { IoHome } from "react-icons/io5";
import { useLanguage } from "../../context/LanguageContext";

const Navigation = () => {
  const { t } = useLanguage();

  return (
    <nav className={css.navigation}>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, isActive && css.activeLink)
        }
        to="/"
      >
        <IoHome />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, isActive && css.activeLink)
        }
        to="/movies"
      >
        {t("Movies")}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, isActive && css.activeLink)
        }
        to="/favorites"
      >
        {t("Favorites")}
      </NavLink>
      <div className={css.rightSection}>
        <ModeSwitch />
        <LangSelector />
      </div>
    </nav>
  );
};

export default Navigation;
