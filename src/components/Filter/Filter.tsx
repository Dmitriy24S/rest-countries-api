import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import "./Filter.css";

const Filter = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <section className={`filter ${isFilterMenuOpen ? "open-menu" : ""}`}>
      <button
        aria-label="open filter list"
        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
      >
        Filter by Region
        <BiChevronDown className="filter-icon" />
      </button>
      {isFilterMenuOpen && (
        <div className="filter-list">
          <ul>
            <li>
              <a href="#/">Africa</a>
            </li>
            <li>
              <a href="#/">America</a>
            </li>
            <li>
              <a href="#/">Asia</a>
            </li>
            <li>
              <a href="#/">Europe</a>
            </li>
            <li>
              <a href="#/">Oceania</a>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Filter;
