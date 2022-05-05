import "./CountryCard.css";
import { Link } from "react-router-dom";

type CountryCardProps = {
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

const CountryCard = ({ ...country }: CountryCardProps) => {
  return (
    <Link to={`/rest-countries-api/countries/${country.name}`}>
      <article className="country-card">
        <img src={country.flag} alt="flag" className="country-flag" />
        <div className="country-info">
          <h2>{country.name}</h2>
          <p>
            Population:
            <span> {country.population}</span>
          </p>
          <p>
            Region:
            <span> {country.region}</span>
          </p>
          <p>
            Capital:
            <span> {country.capital}</span>
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
