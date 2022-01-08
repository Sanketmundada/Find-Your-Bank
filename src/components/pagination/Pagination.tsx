import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "./Pagination.module.css";
type PaginationState = {
  per_page: number;
  curr_page: number;
};

interface Props {
  paginationState: PaginationState;
  setPaginationState: React.Dispatch<React.SetStateAction<PaginationState>>;
  datasize: number | undefined;
}

const Pagination: React.FC<Props> = ({
  paginationState,
  setPaginationState,
  datasize,
}) => {
  const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);

    if (val > 1000) {
      // Handling Pagination Error
      toast(`Max limit of rows per page exceeded ( Max limit is 1000 )`);
      val = 1000;
    }

    setPaginationState((prev) => {
      return {
        ...prev,
        per_page: val,
      };
    });
  };

  const handleCurrentPageChange = (type: "previous" | "next") => {
    setPaginationState((prev) => {
      return {
        ...prev,
        curr_page:
          type === "previous"
            ? prev.curr_page - 1 >= 0
              ? prev.curr_page - 1
              : 0
            : prev.curr_page + 1 < datasize! / per_page - 1
            ? prev.curr_page + 1
            : datasize! / per_page - 1,
      };
    });
  };

  const { curr_page, per_page } = paginationState;

  let from = per_page > 0 ? curr_page * per_page + 1 : curr_page * per_page;
  let to =
    curr_page * per_page + per_page > datasize!
      ? datasize
      : curr_page * per_page + per_page;

  return (
    <div className={styles.paginationWrapper}>
      {datasize !== 0 ? (
        <>
          {" "}
          <div className={styles.paginationInput}>
            <p>Rows per Page</p>
            <input
              value={paginationState.per_page.toString()}
              type="number"
              onChange={handleChangeRows}
            />
          </div>
          <div className={styles.controls}>
            <BsCaretLeftFill
              onClick={() => {
                handleCurrentPageChange("previous");
              }}
              style={{
                color: "var(--text-secondary)",
                cursor: from === 1 ? "not-allowed" : "pointer",
                opacity: from === 1 ? 0.4 : 1,
              }}
            />
            <p
              className={styles.displayInfo}
            >{`${from} - ${to} of ${datasize}`}</p>
            <BsCaretRightFill
              onClick={() => {
                handleCurrentPageChange("next");
              }}
              style={{
                color: "var(--text-secondary)",
                cursor: to === datasize ? "not-allowed" : "pointer",
                opacity: to === datasize ? 0.4 : 1,
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Pagination;
