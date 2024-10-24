import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; 

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async (loc) => {
        try {
            const response = await axios.get(process.env.REACT_APP_WEATHER_API_URL, {
                params: {
                    key: process.env.REACT_APP_WEATHER_API_KEY,
                    q: loc,
                },
            });
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError('Location not found');
            setWeatherData(null);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchWeather(location);
        
        }
    };

    const formatLocalTime = (localtime) => {
        const dateObj = new Date(localtime);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        
        const getOrdinalSuffix = (n) => {
            if (n > 3 && n < 21) return "th";
            switch (n % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };
        
        const formattedDay = `${day}${getOrdinalSuffix(day)}`;
        return `${formattedDay} ${month} ${year} ${hours}:${minutes}`;
    };

    return (
        <div className="main-container">
            <h1>Weather-Prediction-App-React.js</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter City Name:"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    required
                />
            </div>
            <div className="content"style={{ display: weatherData ? 'block' : 'none' }}>
                {weatherData && (
                    <>
                        <h1>{weatherData.location.name}</h1>
                        <h4>Date: {formatLocalTime(weatherData.location.localtime)}</h4>
                        <h2>Temperature: {weatherData.current.temp_c} °C</h2>
                        <h3>Condition: {weatherData.current.condition.text}</h3>
                    </>
                )}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Weather;
