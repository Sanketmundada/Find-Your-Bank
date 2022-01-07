import styles from "./Pagination.module.css";

type Pagination = {
  per_page: number;
  curr_page: number;
};

interface Props {
  paginationState: Pagination;
  setPaginationState: React.Dispatch<React.SetStateAction<Pagination>>;
  datasize: number | undefined;
}

const Pagination: React.FC<Props> = ({
  paginationState,
  setPaginationState,
  datasize,
}) => {
  const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaginationState((prev) => {
      return {
        ...prev,
        per_page: Number(e.target.value),
      };
    });
  };

  const handleCurrentPageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: "previous" | "next",
  ) => {
    e.preventDefault();
    setPaginationState((prev) => {
      return {
        ...prev,
        curr_page:
          type === "previous" ? prev.curr_page - 1 : prev.curr_page + 1,
      };
    });
  };

  const { curr_page, per_page } = paginationState;

  let from = curr_page * per_page + 1;
  let to =
    curr_page * per_page + per_page > datasize!
      ? datasize
      : curr_page * per_page + per_page;

  return (
    <div className={styles.paginationWrapper}>
      Pagination {datasize!}
      <input type="number" onChange={handleChangeRows} />
      <div>
        {`${from} - ${to} of ${datasize}`}
        <button
          onClick={(e) => {
            handleCurrentPageChange(e, "previous");
          }}
          disabled={from === 1}
        >
          Previous
        </button>
        <button
          onClick={(e) => {
            handleCurrentPageChange(e, "next");
          }}
          disabled={to === datasize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
