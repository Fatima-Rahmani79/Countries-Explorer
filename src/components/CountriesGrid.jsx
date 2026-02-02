import CountryCard from "./CountryCard";

export default function CountriesGrid({ countries }) {

  return (
    <div className="countries-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}
