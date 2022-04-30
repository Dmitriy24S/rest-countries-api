import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      setData(data);
      // console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className={`App ${!darkMode ? "light-mode" : ""}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <div className="country-list-actions">
          <Search />
          <Filter />
        </div>
      </main>
    </div>
  );
}

export default App;
