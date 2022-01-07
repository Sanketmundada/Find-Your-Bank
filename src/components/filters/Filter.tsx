import { useContext, useState } from "react";
import Select from "react-select";
import { AppContext } from "../../context";
import { useDebounce, useDidUpdate } from "../../hooks";
import { FilterOptions } from "../../types";
import { CITY_LIST, FILTER_OPTIONS } from "../../utils";
import styles from "./Filter.module.css";

type Option = {
  label: string;
  value: string;
};

const Filter = () => {
  const { filterOptions, setFilterOptions } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue);
  const { category, search_query, selected_city } = filterOptions;

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
        onChange={(val) => {
          handleSelectChange(val!, "selected_city");
        }}
        options={CITY_LIST}
      />
      <Select
        isClearable
        onChange={(val) => {
          handleSelectChange(val!, "category");
        }}
        options={FILTER_OPTIONS}
      />
      <input
        value={inputValue || search_query}
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Filter;
