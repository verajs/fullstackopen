import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ country, capital }) => {
  const [newWeather, setNewWeather] = useState(null);

  const id = "id";

  const WeatherHook = () => {
    console.log("effect initialize");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${id}&units=metric`
      )
      .then((response) => {
        setNewWeather(response.data);
      });
  };
  useEffect(WeatherHook, [country]);

  console.log(country.flag);

  return (
    <div className="moveeverything">
      <div className="divcountry">
        <h2>{country.name}</h2>
      </div>
      <div className="capitalseparation">
        <h3>Capital: {country.capital} </h3>
        <h3>Area: {country.area} km2 </h3>
        <h3>Languages:</h3>
        <ul>
          {country.languages.map((language) => (
            <li key="{language.name}">{language.name}</li>
          ))}
        </ul>
      </div>

      <img className="flagimg" src={country.flag} alt="Country flag" />
      <h2>Weather in {country.capital}</h2>
      <div className="capitalseparation">
        {newWeather !== null && (
          <div>
            <h3>Temperature: {newWeather?.main?.temp}°C</h3>
            <h3>Wind speed: {newWeather?.wind?.speed} km/h</h3>
            <img
              className="weatherimg"
              src={`http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
