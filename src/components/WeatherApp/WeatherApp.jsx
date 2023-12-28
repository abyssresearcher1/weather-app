import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import searchIcon from "../../assets/search.png";
import cloudIcon from "../../assets/cloud.png";
import clearIcon from "../../assets/clear.png";
import drizzleIcon from "../../assets/drizzle.png";
import humidityIcon from "../../assets/humidity.png";
import rainIcon from "../../assets/rain.png";
import snowIcon from "../../assets/snow.png";
import windIcon from "../../assets/wind.png";

const iconMappings = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};

const WeatherApp = () => {
  const apiKey = "55e66c2ee7e7006468c98354a1428cde";

  const [wicon, setWicon] = useState(cloudIcon);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");

  const search = async () => {
    try {
      const element = document.querySelector(".cityInput");
      if (!element.value) {
        return;
      }

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${apiKey}`
      );

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(data.main.temp);
      setLocation(data.name);

      const weatherIcon = data.weather[0].icon;
      setWicon(iconMappings[weatherIcon] || clearIcon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="weather-icon" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity-icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind-icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind}km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
