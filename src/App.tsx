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

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        // console.log(data);
        setData(data);
        setIsLoading(false);
        // setFilteredData(data);
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
          <Filter />
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
          {data.map((item) => (
            <CountryCard {...item} key={item.numericCode} />
          ))}
        </section>{" "}
      </main>
    </div>
  );
}

export default App;
