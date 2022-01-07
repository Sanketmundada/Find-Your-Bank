import { useContext } from "react";
import { Table } from "../../components";
import { AppContext } from "../../context";

const AllBanks: React.FC = () => {
  const { filterData } = useContext(AppContext);
  return <Table data={filterData} pagination filters />;
};

export default AllBanks;
