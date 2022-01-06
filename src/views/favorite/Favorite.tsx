import { useContext } from "react";
import { AppContext } from "../../context";

const Favorite = () => {
  const { favoriteBanks } = useContext(AppContext);
  console.log(favoriteBanks);
  return <div>Favorite</div>;
};

export default Favorite;
