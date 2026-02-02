export default function CountryCard({ country }) {
    return (
        <div className="country-card">
            <img 
            src={country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
            className="country-card__flag"
            />
            <div className="country-card__info">
                <h2 className="country-card__name">{country.name?.common}</h2>
                <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
            </div>
        </div> 
    )
}