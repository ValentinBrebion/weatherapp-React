import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import TemperatureDisplay from '../../src/components/TemperatureDisplay';
import WeatherCode from '../../src/components/WeatherCode';
import ForecastItem from '../../src/components/ForecastItem';

const WeatherWidget = ({ nomCity, latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [tabActive, setTabActive] = useState('day');

    const fetchData = useCallback(() => {
        const timezone = 'Europe/London';
        const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min'];
        const hourlyVars = ['temperature_2m', 'weathercode'];

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(',')}&daily=${dailyVars.join(',')}&timezone=${timezone}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData({
                    data,
                    lastUpdate: Date.now()
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setWeatherData(null);
            });
    }, [longitude, latitude]);

    useEffect(() => {
        fetchData();
        const timer = setInterval(fetchData, 10000);
        return () => {
            clearInterval(timer);
            setLastUpdate(Date.now())
        };
    }, [fetchData]);

    return (
        <div className="weather-container-content">
            <header className="weather-container-header">
                <p className="location">{nomCity}</p>
                <button
                    className="refresh-button"
                    onClick={fetchData}
                    disabled={!weatherData} // Disable refresh button while fetching
                >
                    <img src="https://lpmiaw-react.napkid.dev/img/weather/refresh.png" alt="Refresh" />
                </button>
            </header>
            {weatherData ? (
                <>
                    <p className="date">{new Date().toLocaleDateString()}</p>
                    <article className="today">
                        <WeatherCode code={weatherData.data.daily.weathercode[0]} />
                        <TemperatureDisplay
                            tempmin={weatherData.data.daily.temperature_2m_min[0]}
                            tempmax={weatherData.data.daily.temperature_2m_max[0]}
                            tempmoy={Math.round((weatherData.data.daily.temperature_2m_min[0] + weatherData.data.daily.temperature_2m_max[0]) / 2)}
                        />
                    </article>
                </>
            ) : (
                <p>Pas de données.</p> // Show error message when data is not available
            )}
            <section>
                <nav className="tabs">
                    <button
                        onClick={() => setTabActive('day')}
                        className={tabActive === 'day' ? 'tab tab--active' : 'tab'}
                    >
                        Journée
                    </button>
                    <button
                        onClick={() => setTabActive('week')}
                        className={tabActive === 'week' ? 'tab tab--active' : 'tab'}
                    >
                        Semaine
                    </button>
                </nav>
                <ul className="forecast">
                    {weatherData && (
                        <>
                            {tabActive === 'day' && Array(5).fill(null).map((_, idx) => (
                                <ForecastItem
                                    key={idx}
                                    date={`${6 + idx * 4}h`}
                                    imgSrc={weatherData.data.hourly.weathercode[6 + idx * 4]}
                                    ForeTemp={Math.round(weatherData.data.hourly.temperature_2m[6 + idx * 4])}
                                />
                            ))}
                            {tabActive === 'week' && Array(5).fill(null).map((_, idx) => (
                                <ForecastItem
                                    key={idx}
                                    date={weatherData.data.daily.time[idx + 1].substring(5, 10).replace("-", " / ")}
                                    imgSrc={weatherData.data.daily.weathercode[idx + 1]}
                                    ForeTemp={Math.round((weatherData.data.daily.temperature_2m_min[idx + 1] + weatherData.data.daily.temperature_2m_min[idx + 1]) / 2).toFixed(1)}
                                />
                            ))}
                        </>
                    )}
                </ul>
            </section>
            <footer className="weather-container-footer">
                <p>{lastUpdate && new Date(lastUpdate).toLocaleString()}</p>
            </footer>
        </div>
    );
};

WeatherWidget.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    nomCity: PropTypes.string.isRequired
};

export default WeatherWidget;