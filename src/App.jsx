import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherWidget from "./components/WeatherWidget";
import Nbar from "./components/Navbar/Navbars";
import PM25Page from "./components/page/PM2.5/PM25Page";
import ChiangMaiMap from "./components/page/ChiangMaiMap/ChiangMaiMap.jsx";
import "./App.css";

function App() {
  useEffect(() => {
    const createRain = () => {
      const numberOfRaindrops = 100;
      const container = document.querySelector(".rain-container");

      if (!container) return;

      for (let i = 0; i < numberOfRaindrops; i++) {
        const raindrop = document.createElement("div");
        raindrop.classList.add("rain");
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        container.appendChild(raindrop);
      }
    };

    createRain();

    return () => {
      const container = document.querySelector(".rain-container");
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Nbar />
        <Routes> 
          <Route path="/" element={<WeatherWidget />} />
          <Route path="/pm25" element={<PM25Page />} />
          <Route path="/map" element={<ChiangMaiMap />} />
        </Routes>
        <div className="rain-container"></div>
      </div>
    </Router>
  );
}

export default App;
