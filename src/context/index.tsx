import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDidUpdate } from "../hooks";
import { Bank, ContextType, FilterOptions } from "../types";
import { fetchBanks } from "../utils";

export const AppContext = createContext<ContextType>({
  data: null,
  filterData: null,
  filterOptions: {
    category: null,
    search_query: "",
    selected_city: null,
  },
  setFilterOptions: null,
  favoriteBanks: null,
  toggleFavoriteBank: () => {},
  loading: false,
});

const AppProvider: React.FC = ({ children }) => {
  /* banks will contain all the banks from the fetchBank Api */
  const [banks, setBanks] = useState<Bank[] | null>(null);
  /* Favorite Banks */
  const [favorites, setFavorites] = useState<Bank[] | null>(null);

  /* filtered banks will contain the banks with current filters applied */
  const [filteredBanks, setFilteredBanks] = useState<Bank[] | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    search_query: "",
    selected_city: null,
  });

  const [loading, setLoading] = useState(false);

  const { category, search_query, selected_city } = filterOptions;

  useEffect(() => {
    // Fetching all the banks
    (async () => {
      setLoading(true);
      try {
        const banks = await fetchBanks();
        setBanks(banks);
        setFilteredBanks(banks);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useDidUpdate(() => {
    if ((search_query === "" || !category) && !selected_city) {
      setFilteredBanks(banks);
    } else {
      let arr = banks?.slice();

      if (selected_city) {
        arr = arr?.filter((item) => item.city === selected_city);
      }

      if (category) {
        arr = arr?.filter((item) => {
          return item[category].includes(search_query.toUpperCase());
        });
      }
      setFilteredBanks(arr!);
    }
  }, [category, search_query, selected_city]);

  const toggleFavoriteBank = (bank: Bank) => {
    setBanks((prev) => {
      let arr = prev?.map((previous_bank) => {
        if (previous_bank.ifsc === bank.ifsc)
          return { ...previous_bank, favorite: !bank.favorite };
        return previous_bank;
      });
      return arr!;
    });

    setFilteredBanks((prev) => {
      let arr = prev?.map((previous_bank) => {
        if (previous_bank.ifsc === bank.ifsc)
          return { ...previous_bank, favorite: !bank.favorite };
        return previous_bank;
      });
      return arr!;
    });

    if (!bank.favorite) {
      setFavorites((previous_banks) => {
        if (previous_banks)
          return [...previous_banks!, { ...bank, favorite: !bank.favorite }];
        else {
          return [{ ...bank, favorite: !bank.favorite }];
        }
      });
      toast("Bank Added to favorites");
    } else {
      setFavorites((previous_banks) => {
        let arr = previous_banks?.filter(
          (pre_bank) => pre_bank.ifsc !== bank.ifsc,
        );
        return arr!;
      });
      toast("Bank Removed from favorites");
    }
  };

  return (
    <AppContext.Provider
      value={{
        data: banks,
        filterData: filteredBanks,
        filterOptions,
        setFilterOptions,
        favoriteBanks: favorites,
        toggleFavoriteBank: toggleFavoriteBank,
        loading: loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
