
import React, { useState } from "react";

function FavoriteCities({ favorites, addFavorite, removeFavorite, setCity, fetchWeatherData }) {
  const [newCity, setNewCity] = useState("");

  const handleAddCity = () => {
    if (newCity.trim()) {
      addFavorite(newCity.trim());
      setNewCity("");
    }
  };

  return (
    <div className="favorite-cities" style={{ padding: "10px" }}>
      <h3>Favorite Cities</h3>
      <div className="add-city">
        <input
          type="text"
          placeholder="Enter city name"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button onClick={handleAddCity}>Add City</button>
      </div>
      <div className="city-list">
        {favorites.map((fav, index) => (
          <div key={index} className="favorite-city" style={{ marginBottom: "10px" }}>
            <span>{fav.city}</span>
            <button onClick={() => { setCity(fav.city); fetchWeatherData(fav.city); }}>View Weather</button>
            <button onClick={() => removeFavorite(fav.city)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;