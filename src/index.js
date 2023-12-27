import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=55e66c2ee7e7006468c98354a1428cde`
