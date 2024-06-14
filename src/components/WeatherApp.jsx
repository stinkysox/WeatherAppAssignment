import React, { useState } from "react";
import "./WeatherApp.css";
import cloudImage from "../assets/cloud.png";
import snowImage from "../assets/snow.png";
import drizzleImage from "../assets/drizzle.png";
import clearImage from "../assets/clear.png";
import rainImage from "../assets/rain.png";
import humidityIcon from "../assets/humidity.png";
import windImage from "../assets/wind.png";

const WeatherApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [weatherDetails, setWeatherDetails] = useState({
    humidity: "12 %",
    wind: "19km/h",
    temperature: "15 °c",
    location: "Canada",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [displayIcon, setDisplayIcon] = useState(snowImage);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGetWeatherDetails = async () => {
    const apiKey = "06cd4ec1bf21b3e0c985fb8784b54034";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=${apiKey}`;

    try {
      const response = await fetch(api);
      const data = await response.json();

      setWeatherDetails({
        humidity: data.main.humidity + "%",
        wind: Math.floor(data.wind.speed) + " km/h",
        temperature: Math.floor(data.main.temp) + "°c",
        location: data.name,
      });

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setDisplayIcon(clearImage);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n" ||
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n" ||
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n" // Cloudy conditions
      ) {
        setDisplayIcon(cloudImage);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n" ||
        data.weather[0].icon === "10d" || // Rainy conditions
        data.weather[0].icon === "10n"
      ) {
        setDisplayIcon(rainImage);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setDisplayIcon(snowImage); // snow conditions
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setDisplayIcon(drizzleImage); // Drizzle conditions
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <h1>Weather App</h1>

    <div className={isDarkMode ? "dark-bg" : "weather-w-contianer"}>

      <div className="weather-app-bg">
        <div className="input-container">
          <input
            className="input-el"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter City Name"
          />
          <button className="button" onClick={handleGetWeatherDetails}>
            Get Details
          </button>
        </div>
        <div>
          <div className="toggle-switch">
            <button className="toggle-btn" onClick={toggleDarkMode}>
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <div className="temp-section">
          <div className="temp-image-container">
            <img className="weather-image" src={displayIcon} alt="" />
          </div>
          <div className="temp-text-container">
            <p>{weatherDetails.temperature}</p>
            <p>{weatherDetails.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
