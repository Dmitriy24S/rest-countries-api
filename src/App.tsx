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
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const [finalData, setFinalData] = useState<CountryData[]>([]);

  // Filter list func
  const filterCountryData = () => {
    if (selectedFilter !== "All") {
      // Filter data
      const newFilteredData = data.filter(
        (item): any => item.region === selectedFilter
      );
      setFinalData(newFilteredData);
    } else {
      // If selected filter is all = show all data
      setFinalData(data);
    }
  };

  // Filter country list
  useEffect(() => {
    filterCountryData();
  }, [selectedFilter]);

  // Fetch data on load
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
    <div className={`App ${!darkMode ? "light-mode" : ""}`}>
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <CountryList
                  // searchInputValue={searchInputValue}
                  // setSearchInputValue={setSearchInputValue}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  isLoading={isLoading}
                  finalData={finalData}
                />
              }
            />
            <Route path="/countries/:name" element={<CountryPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
