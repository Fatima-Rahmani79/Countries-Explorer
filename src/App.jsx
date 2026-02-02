import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import CountriesGrid from "./components/CountriesGrid";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  useEffect(() => {
  const controller = new AbortController();

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "https://restcountries.com/v3.1/all";

      if (search.trim() !== "") {
        url = `https://restcountries.com/v3.1/name/${search}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      const res = await fetch(url, { signal: controller.signal });
      // console.log(res);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setCountries(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("No country found");
        setCountries([]);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchCountries();
  return () => controller.abort();
}, [search, region]);



  // serch logic
  const filteredCountries =
    search.trim() === ""
      ? countries
      : countries.filter((country) =>
          country.name?.common?.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <>
      <Header />

      <section className="SearchFilterContainer">
        <SearchBar searchTerm={search} setSearchTerm={setSearch} />
        <Filter
          region={region}
          setRegion={(value) => {
            setRegion(value);
            setSearch("");
          }}
        />
      </section>

      {loading && <p>Loading Countries...</p>}
{error && <p>{error}</p>}

{!loading && !error && countries.length > 0 && (
  <CountriesGrid countries={filteredCountries} />
)}

{!loading && !error && countries.length === 0 && (
  <p>No country found 😕</p>
)}

    </>
  );
}

export default App;
