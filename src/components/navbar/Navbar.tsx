import { useEffect, useState } from "react";
import { Theme } from "../../types";
import styles from "./Navbar.module.css";
import Switch from "react-switch";

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
          <div className={styles.toggle}>
            <span className={styles.toggleLabel}>Light</span>
            <Switch
              checked={theme === "dark"}
              onChange={() => {
                handleThemeChange();
              }}
              onColor="#1DA1F2"
              onHandleColor="#E1E8ED"
              // handleDiameter={22}
              uncheckedIcon={false}
              checkedIcon={false}
              height={26}
              width={60}
              className={styles.toggleButton}
            />
            <span className={styles.toggleLabel}>Dark</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
