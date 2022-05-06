import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CountryList from "./components/CountryList/CountryList";
import CountryPage from "./components/CountryPage/CountryPage";

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

function App() {
  const [data, setData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const [finalData, setFinalData] = useState<CountryData[]>([]);

  // Pagination section - Start
  const [paginatedData, setPaginatedData] = useState<CountryData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dataPerPage = 10;
  const dataShown = (pageNumber - 1) * dataPerPage;
  const pageCount = Math.ceil(finalData.length / dataPerPage);

  // ! any type fix ?
  const handlePaginationChange = (event: any, value: number) => {
    setPageNumber(value);
  };

  // update paginated data on update of page
  useEffect(() => {
    setPaginatedData(finalData.slice(dataShown, dataShown + dataPerPage));
  }, [pageNumber]);

  // pagination theme
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    setDarkMode(!darkMode);
  };
  // Pagination section - End

  //
  // Filter country list by selected region filter
  //
  useEffect(() => {
    // Filter data on selected filter choice
    if (selectedFilter !== "All") {
      const newFilteredData = data.filter(
        (item: CountryData) => item.region === selectedFilter
      );
      if (searchInputValue != null) {
        // if search not empty = update filtered data for filtering with search input // ! future refactor ?
        setFilteredData(newFilteredData);
      } else {
        // if search is empty = update final data state
        setFinalData(newFilteredData);
      }
    } else {
      // If selected filter is 'All' = show all data
      if (searchInputValue != null) {
        // if search not empty = update filtered data for filtering with search input // ! future refactor ?
        setFilteredData(data);
      } else {
        // if search is empty = update final data state
        setFinalData(data);
      }
    }
  }, [selectedFilter]);

  //
  // Update paginated data and return to page 1 if data is updated. E.g. filter/search
  //
  useEffect(() => {
    setPaginatedData(finalData.slice(0, dataPerPage));
    setPageNumber(1);
  }, [finalData]);

  //
  // Filter country list by search
  //
  useEffect(() => {
    // If search field has text = filter data
    if (searchInputValue != null) {
      // take filtered data by current selected region filter -> filter it by search value
      const newFilteredBySearchData = filteredData.filter(
        (country: CountryData) =>
          country.name.toLowerCase().includes(searchInputValue?.toLowerCase())
      );
      setFinalData(newFilteredBySearchData);
    }
  }, [searchInputValue, filteredData]);

  //
  // Fetch data on load
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        // console.log(data);
        setData(data);
        setFilteredData(data);
        setFinalData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleThemeToggle={handleThemeToggle} darkMode={darkMode} />
        <main>
          <Routes>
            <Route
              path="/rest-countries-api/"
              element={
                <CountryList
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  isLoading={isLoading}
                  darkMode={darkMode}
                  finalData={finalData}
                  paginatedData={paginatedData}
                  handlePaginationChange={handlePaginationChange}
                  pageCount={pageCount}
                  pageNumber={pageNumber}
                />
              }
            />
            <Route
              path="/rest-countries-api/countries/:name"
              element={<CountryPage />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
