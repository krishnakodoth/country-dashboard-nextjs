import React, { memo, useEffect, useState } from "react";
import {
  Filter,
  FilterWrapper,
  SearchInput,
  SortButton,
} from "@/styles/StyledComponents";
import { ICountryFilters } from "../type/types";

const CountryFilters = ({
  order,
  regionList,
  sortCountries,
  filterByRegion,
  searchCountry,
}: ICountryFilters) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use effect to debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      searchCountry(searchTerm);
    }, 500); // Debounce delay in milliseconds

    // Cleanup timeout if the component unmounts or searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <FilterWrapper>
      <Filter>
        <label>Filter by Region:</label>
        <select onChange={(e) => filterByRegion(e.target.value)}>
          <option value={""}>Select Region</option>
          {regionList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </Filter>
      <SortButton
        active={order === "asc" ? "true" : "false"}
        onClick={() => sortCountries("asc")}
      >
        Sort by Population (Ascending)
      </SortButton>
      <SortButton
        active={order === "desc" ? "true" : "false"}
        onClick={() => sortCountries("desc")}
      >
        Sort by Population (Descending)
      </SortButton>
      <SearchInput>
        <input
          type="text"
          placeholder="Search Country by name or capital"
          onChange={handleSearch}
        />
      </SearchInput>
    </FilterWrapper>
  );
};

export default memo(CountryFilters);
