import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";

const Bank = () => {
  const { ifsc } = useParams<{ ifsc: string }>();

  const { data } = useContext(AppContext);

  const bank = data?.find((curr) => {
    return curr.ifsc === ifsc;
  });
  console.log(bank);
  // All data being fetched Properly here
  return <div>{JSON.stringify(bank)}</div>;
};

export default Bank;
