import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppProvider: React.FC = ({ children }) => {
  const [banks, setBanks] = useState(null);
  const [favorite, setFavorite] = useState(null);

  const [filteredBanks, setFilteredBanks] = useState(null);

  useEffect(() => {
    // Fetching all the banks
  }, []);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
