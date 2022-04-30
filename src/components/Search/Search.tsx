import { BiSearchAlt2 } from "react-icons/bi";
import "./Search.css";

const Search = () => {
  return (
    <section className="search">
      <BiSearchAlt2 className="search-icon" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for a country..."
        autoComplete="off"
      />
    </section>
  );
};

export default Search;
