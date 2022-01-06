import axios from "axios";
import { BASE_URL, CITY_LIST } from ".";
import { Bank } from "../types";

/* Function to fetch All the Banks */
// TODO =>  Caching
export const fetchBanks = async () => {
  const banks: Bank[] = [];

  await Promise.all(
    CITY_LIST.map(async (city) => {
      try {
        const res = await axios.get(BASE_URL + city.value);
        let curr_banks = res.data;
        curr_banks = curr_banks.map((bank: Bank) => {
          return {
            ...bank,
            favorite: false,
          };
        });
        banks.push(...curr_banks);
      } catch (error) {
        throw error;
      }
    }),
  );

  return banks;
};
