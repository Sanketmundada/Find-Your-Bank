import React, { createContext, useEffect, useState } from "react";
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
});

const AppProvider: React.FC = ({ children }) => {
  /* banks will contain all the banks from the fetchBank Api */
  const [banks, setBanks] = useState<Bank[] | null>(null);
  const [favorites, setFavorites] = useState<Bank[] | null>(null);

  /* filtered banks will contain the banks with current filters applied */
  const [filteredBanks, setFilteredBanks] = useState<Bank[] | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    search_query: "",
    selected_city: null,
  });

  useEffect(() => {
    // Fetching all the banks
    (async () => {
      const banks = await fetchBanks();
      setBanks(banks);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        data: banks,
        filterData: filteredBanks,
        filterOptions,
        setFilterOptions,
        favoriteBanks: favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
