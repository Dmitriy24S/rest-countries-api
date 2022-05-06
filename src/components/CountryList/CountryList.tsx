import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import CountryCard from "../CountryCard/CountryCard";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import React, { useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type CountryData = {
  name: string;
  population: string;
  region: string;
  flag: string;
  capital: string;
  code: string;
  numericCode: string;
  subregion: string;
  topLevelDomain: string;
  borders?: string[];
  currencies: string[];
  languages: string[];
  nativeName: string;
};

type CountryListProps = {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  paginatedData: CountryData[];
  finalData: CountryData[];
  darkMode: boolean;
  handlePaginationChange: (event: any, value: number) => void;
  pageCount: number;
  pageNumber: number;
};

const CountryList = ({
  searchInputValue,
  setSearchInputValue,
  selectedFilter,
  setSelectedFilter,
  isLoading,
  darkMode,
  paginatedData,
  handlePaginationChange,
  pageCount,
  pageNumber,
}: CountryListProps) => {
  // Reset search input value on load, for example: after returning from full country page info
  useEffect(() => {
    setSearchInputValue("");
  }, []);

  // Pagination Theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <>
      <section className="country-list-actions">
        <Search
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
        />
        <Filter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </section>
      {/* Country list container */}
      <section className="country-list">
        {/* Loading */}
        {isLoading && (
          <section className="loading">
            <h2>Loading...</h2>
          </section>
        )}
        {/* Country list */}
        {paginatedData.map((country: CountryData) => (
          <CountryCard {...country} key={country.numericCode} />
        ))}
      </section>

      {/* Pagination */}
      <ThemeProvider theme={theme}>
        <PaginationButtons
          pageCount={pageCount}
          pageNumber={pageNumber}
          handlePaginationChange={handlePaginationChange}
        />
      </ThemeProvider>
    </>
  );
};

export default CountryList;
