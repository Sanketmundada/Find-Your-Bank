import { Link } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../utils";
import styles from "./Sidebar.module.css";

const sideOptions = SIDEBAR_LINKS;
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {sideOptions.map((item, index) => {
        return (
          <div key={index}>
            <Link to={item.link}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
