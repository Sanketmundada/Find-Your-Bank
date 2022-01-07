import { useContext, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { AppContext } from "../../context";
import { useDebounce, useDidUpdate } from "../../hooks";
import { FilterOptions } from "../../types";
import { CITY_LIST, FILTER_OPTIONS } from "../../utils";
import styles from "./Filter.module.css";

type Option = {
  label: string;
  value: string;
};

const style: StylesConfig = {
  control: (styles: any, state) => ({
    ...styles,
    backgroundColor: "var(--card-color)",
    fontSize: "14px",
    margin: "0px 10px",
    minWidth: "150px",
    boxShadow: "none",
    transition: "all 200ms",
    border: state.isFocused
      ? "1px solid var(--hover-color)"
      : "1px solid var(--line-color)",
  }),
  menu: (styles: any, state) => ({
    ...styles,
    backgroundColor: "var(--bg-color)",
    fontSize: "14px",
    boxShadow: "var(--dropdown-shadow)",
    color: "var(--text-secondary)",
  }),
  option: (styles: any) => ({
    ...styles,
    ":active": {
      ...styles[":active"],
      backgroundColor: "var(--hover-color)",
      color: "var(--text-primary)",
      cursor: "pointer",
    },
    ":hover": {
      backgroundColor: "var(--hover-color)",
      color: "var(--text-primary)",
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "var(--text-primary)",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "var(--text-secondary)",
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: "var(--text-secondary)",
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    color: "var(--text-secondary)",
  }),
};

const Filter = () => {
  const { filterOptions, setFilterOptions } = useContext(AppContext);
  const { category, search_query, selected_city } = filterOptions;
  const [inputValue, setInputValue] = useState("" || search_query);
  const debouncedValue = useDebounce(inputValue);

  useDidUpdate(() => {
    console.log("In debounced Effect");
    setFilterOptions!((prev: FilterOptions) => {
      return {
        ...prev,
        search_query: debouncedValue,
      };
    });
  }, [debouncedValue, setFilterOptions]);

  console.log(filterOptions);
  const handleSelectChange = (
    selectedOption: Option | null,
    option: "selected_city" | "category",
  ) => {
    console.log(selectedOption);

    if (!selectedOption) {
      setFilterOptions!((prev: FilterOptions) => {
        return {
          ...prev,
          [option]: null,
        };
      });
    } else {
      setFilterOptions!((prev: FilterOptions) => {
        return {
          ...prev,
          [option]: selectedOption.value,
        };
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.filterWrapper}>
      <Select
        isClearable
        styles={style}
        defaultValue={
          selected_city
            ? {
                label: CITY_LIST.find((item) => item.value === selected_city)
                  ?.label,
                value: selected_city,
              }
            : null
        }
        onChange={(val: any) => {
          handleSelectChange(val!, "selected_city");
        }}
        placeholder="Select City"
        options={CITY_LIST}
      />
      <Select
        isClearable
        styles={style}
        defaultValue={
          category
            ? {
                label: FILTER_OPTIONS?.find((item) => item.value === category)
                  ?.label,
                value: category,
              }
            : null
        }
        onChange={(val: any) => {
          handleSelectChange(val!, "category");
        }}
        placeholder="Select Filter"
        options={FILTER_OPTIONS}
      />
      <input
        value={inputValue}
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        className={styles.searchBar}
      />
    </div>
  );
};

export default Filter;
