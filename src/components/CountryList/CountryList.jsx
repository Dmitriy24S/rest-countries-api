import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import CountryCard from "../CountryCard/CountryCard";

const CountryList = ({
  searchInputValue,
  setSearchInputValue,
  selectedFilter,
  setSelectedFilter,
  isLoading,
  finalData,
}) => {
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
      {/* Country list container*/}
      <section className="country-list">
        {/* Loading */}
        {isLoading && (
          <section className="loading">
            <h2>Loading...</h2>
          </section>
        )}
        {/* Country list */}
        {finalData.map((country) => (
          <CountryCard {...country} key={country.numericCode} />
        ))}
      </section>
    </>
  );
};

export default CountryList;
