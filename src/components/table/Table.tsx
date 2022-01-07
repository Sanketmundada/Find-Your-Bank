import React, { useState } from "react";
import { TableRow } from ".";
import { Pagination, Filter } from "..";
import { Bank } from "../../types";
import styles from "./Table.module.css";
import { TableHeader } from "./TableHeader";

interface Props {
  data: Bank[] | null;
  pagination?: boolean;
  filters?: boolean;
}

export const Table: React.FC<Props> = ({
  data,
  pagination = false,
  filters = false,
}) => {
  const [paginationState, setPaginationState] = useState({
    per_page: 10,
    curr_page: 0,
  });

  const { per_page, curr_page } = paginationState;

  return (
    <div style={{ width: "100%" }}>
      {filters ? <Filter /> : null}
      <table className={styles.table}>
        <TableHeader />
        <tbody className={styles.tablebody}>
          {pagination
            ? data
                ?.slice(curr_page * per_page, curr_page * per_page + per_page)
                .map((bank, index) => {
                  return <TableRow key={index} data={bank} />;
                })
            : data?.map((bank, index) => {
                return <TableRow key={index} data={bank} />;
              })}
        </tbody>
      </table>
      {pagination ? (
        <Pagination
          paginationState={paginationState}
          setPaginationState={setPaginationState}
          datasize={data?.length}
        />
      ) : null}
    </div>
  );
};
