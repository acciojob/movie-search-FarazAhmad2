import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [searchInp, setSearchInp] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    setData(null);
    fetch(`https://www.omdbapi.com/?s=${searchInp}&apikey=99eb9fd1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setData(data.Search);
        } else {
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div>
      <p>Search Movie</p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
        />
        <button>Search</button>
      </form>
      {error && <h3 className="error">{error}</h3>}
      <ul>
        {data &&
          data.map((movie, idx) => (
            <li key={idx}>
              <h1>
                {movie.Title} ({movie.Year})
              </h1>
              <img className="poster" src={movie.Poster} alt="Poster" />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
