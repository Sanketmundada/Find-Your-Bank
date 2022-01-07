import { useContext } from "react";
import { Table } from "../../components";
import { AppContext } from "../../context";
import styles from "./Favorite.module.css";

const Favorite = () => {
  const { favoriteBanks } = useContext(AppContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>Favorite Banks</div>
      <Table data={favoriteBanks} />
    </div>
  );
};

export default Favorite;
