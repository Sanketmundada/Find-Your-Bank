import axios from "axios";
import { BASE_URL, CITY_LIST } from ".";
import { Bank } from "../types";

/* Function to fetch All the Banks */
/* Caching Done using LocalStorage */
export const fetchBanks = async () => {
  let banks: Bank[] = [];

  if (localStorage.getItem("cached_data")) {
    let data = JSON.parse(localStorage.getItem("cached_data")!);
    if (Date.now() - data.createdAt < 5 * 60 * 1000) {
      banks = data.banks;
      return banks;
    }
  }
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

  localStorage.setItem(
    "cached_data",
    JSON.stringify({
      banks: banks,
      createdAt: Date.now(),
    }),
  );

  return banks;
};
