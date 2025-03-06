import React, { useEffect } from 'react';
import WeatherWidget from './components/WeatherWidget';
import Nbar from './components/Navbar/Navbars';
import './App.css';

function App() {
  useEffect(() => {
    const createRain = () => {
      const numberOfRaindrops = 100;
      const container = document.querySelector('.rain-container');

      for (let i = 0; i < numberOfRaindrops; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('rain');
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        container.appendChild(raindrop);
      }
    };

    createRain();

    return () => {
      const container = document.querySelector('.rain-container');
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="App">
      <Nbar />
      <WeatherWidget />
      <div className="rain-container"></div>
    </div>
  );
}

export default App;
