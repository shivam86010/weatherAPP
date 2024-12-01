import React from "react";

function WeatherDisplay({ weatherData, unit }) {
  const { city, list } = weatherData;

  return (
    <div className="weather-display">
      <h2>{city.name}, {city.country}</h2>
      <div className="current-weather">
        <p>Temperature: {list[0].main.temp}°{unit === "metric" ? "C" : "F"}</p>
        <p>Description: {list[0].weather[0].description}</p>
      </div>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {list.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {item.main.temp}°{unit === "metric" ? "C" : "F"}</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;