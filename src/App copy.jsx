import { useState } from "react";
import "./App.css";

import PlanetCard from "./components/PlanetCard";
function App() {
  const [planetName, setPlanetName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [planetInfo, setPlanetInfo] = useState(null);

  const handleInputChange = (event) => {
    setPlanetName(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
      .then((response) => response.json())
      .then((data) => setPlanetInfo(data.results[0]))
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <main id="main">
        <img src="./images/title.svg" alt="logo sw" id="sw-logo" />

        {!planetInfo && !isLoading ? (
          <>
            <img src="./images/spaceship5.png" alt="spaceship" id="spaceship" />
            <div id="search-form">
              <div>
                <img src="./images/left-img.png" alt="" id="left-form-img" />
              </div>
              <div id="right-side">
                <h2 id="discover-text">
                  Discover all the information about Planets of the Star Wars
                  Saga
                </h2>
                <input
                  type="text"
                  placeholder="Enter the name of the planet"
                  id="planet-query-input"
                  value={planetName}
                  onChange={handleInputChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <button id="submit-query-button" onClick={handleSubmit}>
                  <img
                    src="./images/magnifier-icon.svg"
                    alt=""
                    id="magnifier-icon"
                  />
                  <span id="button-text">Search</span>
                </button>
                <div id="filter-container">
                  <div className="filter-items">
                    <img src="./images/filter-icon.svg" alt="Filter" />
                    <p>Filter:</p>
                  </div>
                  <div className="filter-items">
                    <img src="./images/arrow-down.svg" alt="Arrow Down" />
                    <p>Name</p>
                  </div>
                  <div className="filter-items">
                    <img src="./images/arrow-down.svg" alt="Arrow Down" />
                    <p>Population</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PlanetCard planet={planetInfo} />
        )}
        {isLoading && <div id="spinner"></div>}
      </main>
    </>
  );
}

export default App;
