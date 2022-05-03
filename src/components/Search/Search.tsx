import { BiSearchAlt2 } from "react-icons/bi";
import "./Search.css";

type SearchProps = {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ searchInputValue, setSearchInputValue }: SearchProps) => {
  return (
    <section className="search">
      <BiSearchAlt2 className="search-icon" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for a country..."
        autoComplete="off"
        value={searchInputValue}
        onChange={(e) => {
          setSearchInputValue(e.target.value);
        }}
      />
    </section>
  );
};

export default Search;
