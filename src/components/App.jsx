import React, { useState, useEffect } from 'react'
import TemperatureDisplay from '../../src/components/TemperatureDisplay';
import WeatherCode from '../../src/components/WeatherCode';




const App = () => {
  const [apimeteo, setApiMeteo] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null);

  const FetchAPImeteo = () => {
    const latitude = 46.1592
    const longitude = -1.171
    const timezone = 'Europe/London'
  

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}`)
    .then(res => res.json())
    .then(data => {
      setApiMeteo(data);
      // Mettez à jour le timestamp de la dernière mise à jour
     setLastUpdate(Date.now());
    });

  }
  useEffect(() => {
    // Mettez à jour la date lors du premier rendu
    FetchAPImeteo();
  }, []);
  
  
  return <main className="weather-container">
    <div className="weather-container-content">
      <header className="weather-container-header">
        <p className="location">La Rochelle</p>
        <button className="refresh-button" onClick={FetchAPImeteo}>
          <img src="https://lpmiaw-react.napkid.dev/img/weather/refresh.png" alt="Refresh" />
        </button>
      </header>
      <p className="date">10/20/2021</p>
      <article className="today">
        <WeatherCode code={"2"} />
        
        <TemperatureDisplay
        tempmin={20}
        tempmax={25}
        tempmoy={10}
        />
        
      </article>
      <section className="hidden">
        <nav className="tabs">
          <button className="tab tab--active">
            Journée
          </button>
          <button className="tab">
            Semaine
          </button>
        </nav>
        <ul className="forecast">
          <li className="forecast-item">
            <p>
              20/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              21/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              22/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              23/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
        </ul>
      </section>
      <footer className="weather-container-footer">
        <p>{lastUpdate && new Date(lastUpdate).toLocaleString()}</p>
      </footer>
    </div>
  </main>
}

export default App