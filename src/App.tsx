import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import CountryCard from "./components/CountryCard/CountryCard";

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
  const [filteredData, setFilteredData] = useState(data);

  // Filter list func
  const filterCountryData = () => {
    if (selectedFilter !== "All") {
      // Filter data
      const newFilteredData = data.filter(
        (item): any => item.region === selectedFilter
      );
      setFilteredData(newFilteredData);
    } else {
      // If selected filter is all = show all data
      setFilteredData(data);
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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <section className="country-list-actions">
          <Search />
          <Filter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </section>
        {/* Country list container*/}
        <section className="country-list">
          {/* Loading */}
          {isLoading && (
            <section className="loading">
              <h2>Loading...</h2>
            </section>
          )}
          {/* Country list */}
          {filteredData.map((item) => (
            <CountryCard {...item} key={item.numericCode} />
          ))}
        </section>{" "}
      </main>
    </div>
  );
}

export default App;
