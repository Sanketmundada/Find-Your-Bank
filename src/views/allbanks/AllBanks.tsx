import { useContext } from "react";
import { AppContext } from "../../context";

const AllBanks: React.FC = () => {
  const { data } = useContext(AppContext);
  return <div></div>;
};

export default AllBanks;
