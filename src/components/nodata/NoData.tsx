import styles from "./NoData.module.css";
import NoDataFound from "../../assets/dataNotFound.png";

const NoData = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={NoDataFound} alt="No Data Found" />
      <h3 className={styles.text}>No Data Found</h3>
    </div>
  );
};

export default NoData;
