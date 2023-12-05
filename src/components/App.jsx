import React, { useState, useEffect } from 'react'
import TemperatureDisplay from '../../src/components/TemperatureDisplay';
import WeatherCode from '../../src/components/WeatherCode';
import ForecastItem from '../../src/components/ForecastItem';




const App = () => {
  const [apimeteo, setApiMeteo] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null);
  const [tabActive, setLastActive] = useState(null)

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
      // Mettez à jour le timestamp de la dernière mise à jour
      console.log(data)
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
                tempmoy={Math.round(apimeteo.daily.temperature_2m_min[0]+apimeteo.daily.temperature_2m_max[0]/2)}
              />
            </>
          ) : (
            <p>Pas de données.</p>
          )}
        
        
      </article>
      <section>
        <nav className="tabs">
          <button onClick={() => setLastActive('day')} className={tabActive === 'day' ? 'tab tab--active' : 'tab'}>
            Journée
          </button>
          <button onClick={() => setLastActive('week')} className={tabActive === 'week' ? 'tab tab--active' : 'tab'}>
            Semaine
          </button>
        </nav>
        <ul className="forecast">
        {apimeteo ? (
          <>
           {tabActive === 'day' && Array(5).fill(null).map((key, idx) =><ForecastItem
           key={idx}
          date={`${6+(idx*4)}h`}
          imgSrc={apimeteo.hourly.weathercode[6+(idx*4)]}
          ForeTemp={Math.round(apimeteo.hourly.temperature_2m[6+(idx*4)])
          }
          />)}

          {tabActive === 'week' && Array(5).fill(null).map((key, idx) =><ForecastItem
           key={idx}
          date={apimeteo.daily.time[idx+1].substring(5,10).replace("-"," / ")}
          imgSrc={apimeteo.daily.weathercode[idx+1]}
          ForeTemp={Math.round(apimeteo.daily.temperature_2m_max[idx+1]+ apimeteo.daily.temperature_2m_min[idx+1]/2).toFixed(1)}
          />)}
          </>
          ) : (
            <p>Pas de données.</p>
          )}
          
        </ul>
      </section>
      <footer className="weather-container-footer">
        <p>{lastUpdate && new Date(lastUpdate).toLocaleString()}</p>
      </footer>
    </div>
  </main>
}

export default App