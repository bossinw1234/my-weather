import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import Nbar from './components/Navbar/Navbars'
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
