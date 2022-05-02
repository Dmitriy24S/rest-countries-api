import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./Filter.css";

type FilterProps = {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ selectedFilter, setSelectedFilter }: FilterProps) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Set selected filter, close menu
  const handleFilterChoice = (e: React.MouseEvent) => {
    const filterValue = e.currentTarget as HTMLButtonElement;
    setSelectedFilter(filterValue.innerText);
    setIsFilterMenuOpen(false);
  };

  return (
    <section className={`filter ${isFilterMenuOpen ? "open-menu" : ""}`}>
      <button
        aria-label="open filter list"
        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
      >
        <>
          {selectedFilter !== "All" ? selectedFilter : "Filter by Region"}
          <BiChevronDown className="filter-icon" />
        </>
      </button>
      {isFilterMenuOpen && (
        <div className="filter-list">
          <ul>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>All</button>
            </li>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>Africa</button>
            </li>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>Americas</button>
            </li>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>Asia</button>
            </li>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>Europe</button>
            </li>
            <li>
              <button onClick={(e) => handleFilterChoice(e)}>Oceania</button>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Filter;
