import { useContext } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";
import styles from "./Bank.module.css";

const Bank = () => {
  const { ifsc } = useParams<{ ifsc: string }>();

  const { data, toggleFavoriteBank } = useContext(AppContext);

  const bank = data?.find((curr) => {
    return curr.ifsc === ifsc;
  });

  const handleFavorite = () => {
    toggleFavoriteBank(bank!);
  };
  console.log(bank);
  // All data being fetched Properly here
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>Bank Details</div>
      <div className={styles.detailCard}>
        <div className={styles.cardHeader}>
          <div> {bank?.bank_name}</div>
          <div>
            <MdOutlineFavorite
              onClick={handleFavorite}
              size={24}
              color={bank?.favorite ? "#1DA1F2" : "lightgray"}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={styles.subHeader}>
          <span>IFSC Code : </span>
          {bank?.ifsc}
        </div>
        <div className={styles.cardBody}>
          <div>
            <span>Bank Id : </span>
            {bank?.bank_id}
          </div>
          <div>
            <span>Address : </span>
            {bank?.address}
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div>
            <span className={styles.title}>District : </span>
            {bank?.district}
          </div>
          <div>
            <span className={styles.title}>City : </span>
            {bank?.city}
          </div>
          <div>
            <span className={styles.title}>State : </span>
            {bank?.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
