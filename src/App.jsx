import { useState } from 'react'
import './index.css'
import Header from './components/Header';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  return (
    <>
      <Header />
    </>
  )
}

export default App
