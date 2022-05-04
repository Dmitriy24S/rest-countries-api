import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import "./CountryPage.css";

type CountryPageProps = {
  name: string;
  population: string;
  region: string;
  flag: string;
  capital: string;
  code: string;
  numericCode: string;
  subregion: string;
  topLevelDomain: string[];
  borders?: string[];
  currencies: any[]; // ! fix type
  languages: any[]; // ! fix type
  nativeName: string;
};

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState<CountryPageProps>();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch selected country data
  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v2/name/${name}`);
      const countryData = await response.json();
      setCountry(countryData[0]);
      setIsLoading(false);
    };
    fetchCountryData();
  }, [name]);

  return (
    <div className="country-info-container">
      {isLoading ? (
        <h3 className="loading-status-message">Loading...</h3>
      ) : (
        <>
          {/* Back button */}
          <Link to="/">
            <button className="back-button">
              <>
                <MdOutlineKeyboardBackspace className="back-button-icon" />
                Back
              </>
            </button>
          </Link>
          <article className="country-details">
            {/* Flag */}
            <div className="country-flag-container">
              <img src={country?.flag} alt="flag" className="country-flag" />
            </div>
            <div className="country-info">
              {/* Country name */}
              <section className="country-name">
                <h2>{country?.name}</h2>
              </section>
              <div className="country-info-sections-container">
                {/* Country info section */}
                <section className="country-info-section">
                  <p>
                    Native Name:
                    <span> {country?.nativeName}</span>
                  </p>
                  <p>
                    Population:
                    <span> {country?.population.toLocaleString()}</span>
                  </p>
                  <p>
                    Region:
                    <span> {country?.region}</span>
                  </p>
                  <p>
                    Sub Region:
                    <span> {country?.subregion}</span>
                  </p>
                  <p>
                    Capital:
                    <span> {country?.capital}</span>
                  </p>
                </section>
                {/* Country info section */}
                <section className="country-info-section">
                  <p>
                    Top level domain:
                    {country?.topLevelDomain.map((domain, index) => (
                      <span key={index}> {domain}</span>
                    ))}
                  </p>
                  <p>
                    Currencies:
                    {country?.currencies.map((currency, index) => (
                      <span key={index}> {currency.name}</span>
                    ))}
                  </p>
                  <p>
                    <>
                      Languages:
                      {country?.languages.map((language, index, arr) =>
                        index === arr.length - 1 ? (
                          <span key={index}> {language.name}</span>
                        ) : (
                          <span key={index}>{` ${language.name}, `}</span>
                        )
                      )}
                    </>
                  </p>
                </section>
              </div>
              {/* Border countries */}
              <section className=" country-info-section border-countries-container">
                <p>Border Countries </p>
                <ul className="border-countries-list">
                  {country?.borders
                    ? country?.borders?.map((border, index) => (
                        <li key={index} className="tag">
                          {border}
                        </li>
                      ))
                    : "None"}
                </ul>
              </section>
            </div>
          </article>
        </>
      )}
    </div>
  );
};

export default CountryPage;
