import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SearchPage({ onPlanetNameChange, allPlanetsData }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    let name, planetByPopulation;

    if (!inputValue) {
      setToastVisible(true);
      setToastMessage("Type something to search.");
      return;
    }

    if (!isNaN(inputValue) && allPlanetsData?.length) {
      const populationValue = Number(inputValue);
      planetByPopulation = allPlanetsData.filter((planet) => {
        const population = Number(planet.population);
        return !isNaN(population) && population === populationValue
          ? planet
          : null;
      })[0];
      if (planetByPopulation) {
        name = planetByPopulation.name;
      }
    } else {
      name = inputValue;
    }

    fetch(`https://swapi.dev/api/planets/?search=${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.results.length) {
          setToastVisible(true);
          setToastMessage("Nothing found with this search. Please try again.");
          setTimeout(() => {
            setToastVisible(false);
          }, 8000);
        } else {
          const planetData = data.results[0];
          onPlanetNameChange(planetData);
          navigate(`/planet/${planetData.name}`);
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <div id="spinner"></div>}
      <div id="search-form">
        <div id="image-container-right-side">
          <img src="./images/left-img.png" alt="" id="left-form-img" />
          <img src="./images/spaceship5.png" alt="spaceship" id="spaceship" />
        </div>
        <div id="right-side">
          <h2 id="discover-text">
            Discover all the information about Planets of the Star Wars Saga
          </h2>
          <input
            type="text"
            placeholder="Enter the name of the planet"
            id="planet-query-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button id="submit-query-button" onClick={handleSubmit}>
            <img src="./images/magnifier-icon.svg" alt="" id="magnifier-icon" />
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
        <div className={`toast ${toastVisible ? "show" : ""}`}>
          {toastMessage}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
