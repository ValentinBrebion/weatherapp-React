import React, { useState } from 'react';
import WeatherWidget from '../../src/components/WeatherWidget';
import SearchBar from '../../src/components/Search';

const App = () => {

  const [location, setLocation] = useState({
    centre: {
      coordinates: [
        -1.171,
        46.1592
      ]
    },
    nom: 'La Rochelle'
  })
  const coordinates = location.centre ? location.centre.coordinates : [0, 0];
  const [longitude, latitude] = coordinates
  return <main className="weather-container">
    <SearchBar
    onSelect={setLocation}
    />
    <WeatherWidget
    nomCity={location.nom}
    latitude={latitude}
    longitude={longitude}
    ></WeatherWidget>
  </main>
}

export default App