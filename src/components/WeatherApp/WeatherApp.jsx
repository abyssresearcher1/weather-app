import React from "react";
import "./WeatherApp.css";
import searchIcon from "../../assets/search.png";
import cloudIcon from "../../assets/cloud.png";
import clearIcon from "../../assets/clear.png";
import drizzleIcon from "../../assets/drizzle.png";
import humidityIcon from "../../assets/humidity.png";
import rainIcon from "../../assets/rain.png";
import snowIcon from "../../assets/snow.png";
import windIcon from "../../assets/wind.png";
import { useState } from "react";

const WeatherApp = () => {
  const apiKey = "55e66c2ee7e7006468c98354a1428cde";

  const [wicon, setWicon] = useState(cloudIcon);

  const search = async () => {
    try {
      const element = document.querySelector(".cityInput");
      if (!element.value) {
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      const humidityElement = document.querySelector(".humidity-percent");
      const windElement = document.querySelector(".wind-rate");
      const tempElement = document.querySelector(".weather-temp");
      const locationElement = document.querySelector(".weather-location");

      humidityElement.innerHTML = `${data.main.humidity}%`;
      windElement.innerHTML = `${data.wind.speed}m/s`;
      tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
      locationElement.innerHTML = data.name;

      // Обработка иконок погоды
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clearIcon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloudIcon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzleIcon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzleIcon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rainIcon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rainIcon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snowIcon);
      } else {
        setWicon(clearIcon);
      }
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
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity-icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind-icon" className="icon" />
          <div className="data">
            <div className="wind-rate">18km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
