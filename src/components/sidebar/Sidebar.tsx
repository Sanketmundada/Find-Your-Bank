import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { AiTwotoneBank } from "react-icons/ai";
import styles from "./Sidebar.module.css";

const sideOptions = [
  {
    name: "All Banks",
    link: "/allbanks",
    icon: () => <AiTwotoneBank size={18} />,
  },
  {
    name: "Favorite",
    link: "/favorites",
    icon: () => <MdFavorite size={18} />,
  },
];
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {sideOptions.map((item, index) => {
        return (
          <div key={index} className={styles.navDivs}>
            <Link to={item.link} className={styles.navLinks}>
              {item.icon()}
              <p>{item.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
