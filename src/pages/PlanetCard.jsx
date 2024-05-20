import React from "react";
import { planetImages } from "../assets/planet-images";
import { useNavigate } from "react-router-dom";

function PlanetCard({ planet }) {
  const navigate = useNavigate();

  if (!planet) {
    console.log(navigate);
    navigate("/");
    return;
  }

  return (
    <>
      <div id="planet-card">
        <div id="first-row">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "20px",
              width: "50%",
            }}
          >
            <img
              src={planetImages[planet.name.toLowerCase()]}
              alt="Planet"
              id="planet-image"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "black",
              }}
            >
              <p style={{ marginBottom: 0 }}>Planet:</p>
              <h2 style={{ margin: 0 }}>{planet.name}</h2>
            </div>
          </div>
          <div id="planet-info-container">
            <div className="planet-info">
              <img src="../images/thermometer.svg" alt="Climate" />
              <p>
                <span className="detail">Climate: </span>
                <span className="uppercase">{planet.climate}</span>
              </p>
            </div>
            <div className="planet-info">
              <img src="../images/terrain-icon.svg" alt="Terrain" />
              <p>
                <span className="detail">Terrain: </span>
                <span className="uppercase">{planet.terrain}</span>
              </p>
            </div>
            <div className="planet-info">
              <img src="../images/people-icon.svg" alt="Population" />
              <p>
                <span className="detail">Population: </span>
                {planet.population}
              </p>
            </div>
          </div>
        </div>
        <div className="planet-details">
          <div className="detail-header">
            <img src="../images/person-icon.svg" alt="Residents" />
            <span className="header-text">Residents: </span>
          </div>
          <p style={{ padding: "0 6px" }}>
            Residents:{" "}
            {planet.residents
              .map((url) => {
                const number = url.match(/\d+/g)[0].padStart(2, "0");
                return `People ${number}`;
              })
              .join(", ")}
          </p>
        </div>
        <div className="planet-details">
          <div className="detail-header">
            <img src="../images/person-icon.svg" alt="Residents" />
            <span className="header-text">
              Films ({planet?.films?.length ?? 0}):{" "}
            </span>
          </div>
          <p style={{ padding: "0 6px" }}>
            Films:{" "}
            {planet.films
              .map((url) => {
                const number = url.match(/\d+/g)[0].padStart(2, "0");
                return `Films ${number}`;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <a id="back-button" href="/">
        <img src="../images/back.svg" alt="go back" id="back-button-arrow" />
        <span>Voltar</span>
      </a>
    </>
  );
}

export default PlanetCard;
