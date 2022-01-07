import { columns } from "../../utils";
import styles from "./Table.module.css";

export const TableHeader = () => {
  return (
    <thead style={{ width: "100%" }}>
      <tr className={styles.tableheader}>
        {columns.map((item, index) => {
          return (
            <th
              key={index}
              className={styles.tableheader__cell}
              style={{ ...item.style }}
            >
              {item.label}
            </th>
          );
        })}
        <th style={{ flex: 1 }}></th>
      </tr>
    </thead>
  );
};
