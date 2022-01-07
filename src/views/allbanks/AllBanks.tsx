import { useContext } from "react";
import { Loader, Table } from "../../components";
import { AppContext } from "../../context";

const AllBanks: React.FC = () => {
  const { filterData, loading } = useContext(AppContext);

  if (loading) {
    return <Loader />;
  }

  return <Table data={filterData} pagination filters />;
};

export default AllBanks;
