import React from 'react';
import WeatherWidget from './WeatherWidget';
import Nbar from './components/Navbars'
import './App.css';
function App() {
  return (
    <div className="App">
      <Nbar/>
      <WeatherWidget />
      
    </div>
  );
}

export default App;
