import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import Nbar from './components/Navbars'
function App() {
  return (
    <div className="App">
      <Nbar/>
      <WeatherWidget />
      
    </div>
  );
}

export default App;
