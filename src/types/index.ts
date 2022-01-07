import React from "react";

export type Theme = "light" | "dark";

export interface Bank {
  ifsc: string;
  bank_id: number;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bank_name: string;
  favorite: boolean;
}

export interface FilterOptions {
  selected_city: string | null;
  category: "ifsc" | "bank_name" | "branch" | null;
  search_query: string;
}
export interface ContextType {
  data: Bank[] | null;
  filterData: Bank[] | null;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>> | null;
  favoriteBanks: Bank[] | null;
  toggleFavoriteBank: (bank: Bank) => void;
}
