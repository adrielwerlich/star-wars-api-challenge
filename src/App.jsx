import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

import PlanetCard from "./pages/PlanetCard";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";

function App() {
  const [planetData, setPlanetData] = useState("");
  const [allPlanetsData, setAllPlanetsData] = useState(null);

  const handlePlanetData = (data) => {
    setPlanetData(data);
  };

  useEffect(() => {
    async function fetchAllPlanets() {
      let url = "https://swapi.dev/api/planets/";
      let allPlanets = [];

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allPlanets = allPlanets.concat(data.results);
        url = data.next;
      }

      return allPlanets;
    }

    fetchAllPlanets()
      .then((data) => {
        console.log(data);
        setAllPlanetsData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <main id="main">
        <img src="../images/title.svg" alt="logo sw" id="sw-logo" />

        <Router>
          <Routes>
            <Route
              path="/planet/:planetName"
              element={<PlanetCard planet={planetData} />}
            />
            <Route
              path="/"
              element={<SearchPage onPlanetNameChange={handlePlanetData} allPlanetsData={allPlanetsData}/>}
            />
          </Routes>
        </Router>

        <Footer />
      </main>
    </>
  );
}

export default App;
