import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import CountriesGrid from "./components/CountriesGrid";
import Debounce from "./components/Debonouse";
import CountriesSkeletonGrid from "./components/CountriesSkeletonGrid";

function App() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [retryCount, setRetryCount] = useState(0);

  const debouncedSearch = Debounce(search, 500);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);

        const fields = "fields=name,flags,region,population,cca3";
        let url = `https://restcountries.com/v3.1/all?${fields}`;

        if (debouncedSearch.trim() !== "") {
          url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
            debouncedSearch,
          )}?${fields}`;
        } else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}?${fields}`;
        }

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("NOT_FOUND");
          } else {
            throw new Error("GENERIC_ERROR");
          }
        }
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.message === "NOT_FOUND") {
          setError("No country found.");
        } else {
          setError("Something went wrong. Check your connection.");
        }

        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
    return () => controller.abort();
  }, [debouncedSearch, region, retryCount]);

  const getCountryName = (c) => c?.name?.common ?? c?.name ?? "";

  const filteredCountries =
    !countries || search.trim() === ""
      ? (countries ?? [])
      : countries.filter((country) =>
          getCountryName(country).toLowerCase().includes(search.toLowerCase()),
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

        <button className="btn"
          onClick={() => {
            setSearch("");
            setRegion("all");
          }}
        >
          Clear Filters
        </button>
      </section>

      {loading && <CountriesSkeletonGrid />}

      {error && !loading && (
        <div className="error-box">
          <p>Error: {error}</p>
          <button onClick={() => setRetryCount((c) => c + 1)}>Retry</button>
        </div>
      )}

      {!loading && !error && countries && countries.length > 0 && (
        <CountriesGrid countries={filteredCountries} />
      )}

      {!loading && !error && countries && countries.length === 0 && (
        <p>No country found 😕</p>
      )}
    </>
  );
}

export default App;
