import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import TemperatureDisplay from '../../src/components/TemperatureDisplay';
import WeatherCode from '../../src/components/WeatherCode';
import ForecastItem from '../../src/components/ForecastItem';

const WeatherWidget = props => {
    const {
        nomCity,
        latitude,
        longitude
    } = props
    const [apimeteo, setApiMeteo] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null);
  const [tabActive, setLastActive] = useState('day')


  const getData = useCallback(() => {
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
      setApiMeteo({
        data,
        lastUpdate: Date.now()
      });
    });
  },  [longitude, latitude])

  useEffect(() => {
    getData()
    const timer = setInterval(getData, 10000)
    return () => {
      clearInterval(timer)
    }
  }, [getData])


    return <div className="weather-container-content">
      <header className="weather-container-header">
        <p className="location">{nomCity}</p>
        <button 
        className="refresh-button" 
        onClick={getData}
        >
          <img src="https://lpmiaw-react.napkid.dev/img/weather/refresh.png" alt="Refresh" />
        </button>
      </header>
      {apimeteo ? (
            <>
      <p className="date">12/05/2023</p>
      <article className="today">
        
      
              <WeatherCode code={apimeteo.daily.weathercode[0]} />
              <TemperatureDisplay
                tempmin={apimeteo.daily.temperature_2m_min[0]}
                tempmax={apimeteo.daily.temperature_2m_max[0]}
                tempmoy={Math.round(apimeteo.daily.temperature_2m_min[0] + apimeteo.daily.temperature_2m_max[0] /2)}
              />
              
            
        
        
      </article>
      </>
          ) : (
            <p>Pas de données.</p>
          )}
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
          ForeTemp={Math.round(apimeteo.daily.temperature_2m_min[idx+1]+apimeteo.daily.temperature_2m_min[idx+1]/2).toFixed(1)}
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
}

WeatherWidget.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    nomCity: PropTypes.string.isRequired
}

export default WeatherWidget