import "./CountryCard.css";

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

const CountryCard = ({ ...item }: CountryCardProps) => {
  return (
    <article className="country-card">
      <img src={item.flag} alt="flag" className="country-flag" />
      <div className="country-info">
        <h2>{item.name}</h2>
        <p>
          Population:
          <span> {item.population}</span>
        </p>
        <p>
          Region:
          <span> {item.region}</span>
        </p>
        <p>
          Capital:
          <span> {item.capital}</span>
        </p>
      </div>
    </article>
  );
};

export default CountryCard;
