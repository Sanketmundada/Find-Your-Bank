import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context";
import { Bank } from "../../types";
import { columns } from "../../utils";
import styles from "./Table.module.css";
import { MdOutlineFavorite } from "react-icons/md";

interface Props {
  data: Bank;
}

export const TableRow: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { toggleFavoriteBank } = useContext(AppContext);

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    e.preventDefault();
    history.push(`/bankdetails/${data.ifsc}`);
  };

  const handleFavorite = (bank: Bank) => {
    toggleFavoriteBank(bank);
  };
  return (
    <tr className={styles.tablerow} onClick={handleClick}>
      {columns.map((item, index) => {
        return (
          <td
            key={index}
            className={styles.tablerow__cell}
            style={{ ...item.style }}
          >
            {data[item.value as keyof Bank]}
          </td>
        );
      })}
      <td className={styles.tablerow__cell} style={{ flex: 1 }}>
        <div
          onClick={(e) => {
            handleFavorite(data);
            e.stopPropagation();
          }}
        >
          <MdOutlineFavorite
            size={20}
            color={data.favorite ? "#1DA1F2" : "lightgray"}
          />
        </div>
      </td>
    </tr>
  );
};
