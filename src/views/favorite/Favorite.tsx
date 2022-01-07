import { useContext } from "react";
import { Table } from "../../components";
import { AppContext } from "../../context";

const Favorite = () => {
  const { favoriteBanks } = useContext(AppContext);

  return <Table data={favoriteBanks} />;
};

export default Favorite;
