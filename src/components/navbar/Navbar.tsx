import { useEffect, useState } from "react";
import { Theme } from "../../types";
import styles from "./Navbar.module.css";
const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "light",
  );

  useEffect(() => {
    const htmlTag = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      htmlTag.classList.remove("dark");
      htmlTag.classList.add("light");
    } else {
      htmlTag.classList.remove("light");
      htmlTag.classList.add("dark");
    }
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      else return "light";
    });
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarLinks}>
        <li>
          <p className={styles.logo}>Find Your Bank</p>
        </li>
        <li>
          <div onClick={handleThemeChange}>Mode Toggle</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
