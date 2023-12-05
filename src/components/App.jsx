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

 
    const dailyVars = [
      'weathercode',
      'temperature_2m_max',
      'temperature_2m_min'
    ]
    
    const hourlyVars = [
      'temperature_2m',
      'weathercode'
    ]
   

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(',')}&daily=${dailyVars.join(',')}&timezone=${timezone}`)
    .then(res => res.json())
    .then(data => {
      setApiMeteo(data);
      console.log(data)
      
      // Mettez à jour le timestamp de la dernière mise à jour
     setLastUpdate(Date.now());
    });

  }

  useEffect(() => {
    FetchAPImeteo()
    const timer = setInterval(FetchAPImeteo, 10000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const reducer = (accumulator, curr) => accumulator + curr;
  
  return <main className="weather-container">
    <div className="weather-container-content">
      <header className="weather-container-header">
        <p className="location">La Rochelle</p>
        <button 
        className="refresh-button" 
        onClick={FetchAPImeteo}
        >
          <img src="https://lpmiaw-react.napkid.dev/img/weather/refresh.png" alt="Refresh" />
        </button>
      </header>
      <p className="date">10/20/2021</p>
      <article className="today">
        
      {apimeteo ? (
            <>
              <WeatherCode code={apimeteo.daily.weathercode[0]} />
              <TemperatureDisplay
                tempmin={apimeteo.daily.temperature_2m_min[0]}
                tempmax={apimeteo.daily.temperature_2m_max[0]}
                tempmoy={Math.round(apimeteo.daily.temperature_2m_max.reduce(reducer)/apimeteo.daily.temperature_2m_max.length)}
              />
            </>
          ) : (
            <p>Pas de données.</p>
          )}
        
        
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