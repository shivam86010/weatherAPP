
import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import WeatherDisplay from "./WeatherDisplay";
import FavoriteCities from "./FavoriteCities";
import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState(() => {
    return localStorage.getItem("lastCity") || "";
  });
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric"); // metric for Celsius, imperial for Fahrenheit

  useEffect(() => {
    if (currentCity) {
      fetchWeatherData(currentCity);
    }
  }, [currentCity, unit]);

  useEffect(() => {
    localStorage.setItem("lastCity", currentCity);
  }, [currentCity]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:3001/favorites");
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Error fetching favorite cities:", error);
      }
    };
    fetchFavorites();
  }, []);

  const fetchWeatherData = async (city) => {
    const apiKey = "53d09bfe1af8def5e1894db12e0efead"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch weather data");
    }
  };

  const addFavorite = async (city) => {
    if (city && !favorites.some((fav) => fav.city === city)) {
      const newFavorite = { city };
      setFavorites([...favorites, newFavorite]);
      try {
        await fetch("http://localhost:3001/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFavorite),
        });
      } catch (error) {
        console.error("Error adding favorite city:", error);
      }
    }
  };

  const removeFavorite = async (city) => {
    const favoriteToRemove = favorites.find((fav) => fav.city === city);
    if (favoriteToRemove) {
      setFavorites(favorites.filter((fav) => fav.city !== city));
      try {
        await fetch(`http://localhost:3001/favorites/${favoriteToRemove.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error removing favorite city:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <SearchComponent setCity={setCurrentCity} />
      <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      {weatherData && (
        <WeatherDisplay weatherData={weatherData} unit={unit} />
      )}
      <FavoriteCities 
        favorites={favorites} 
        addFavorite={addFavorite} 
        removeFavorite={removeFavorite} 
        setCity={setCurrentCity} 
        fetchWeatherData={fetchWeatherData} 
      />
    </div>
  );
}

export default App;