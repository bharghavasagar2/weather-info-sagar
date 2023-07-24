import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

const API_KEY = "fe4feefa8543e06d4f3c66d92c61b69c";

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherInfo = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
`;

const WeatherIcon = styled.div`
  font-size: 48px;
`;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  console.log(weatherData)
  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherIcon = (iconCode) => {
    console.log(iconCode)
    const weatherIcons = {
      "01d": <WiDaySunny />,
      "01n": <WiDaySunny />,
      "02d": <WiCloud />,
      "02n": <WiCloud />,
      "03d": <WiCloud />,
      "03n": <WiCloud />,
      "04d": <WiCloud />,
      "04n": <WiCloud />,
      "09d": <WiRain />,
      "09n": <WiRain />,
      "10d": <WiRain />,
      "10n": <WiRain />,
      "11d": <WiThunderstorm />,
      "11n": <WiThunderstorm />,
      "13d": <WiSnow />,
      "13n": <WiSnow />,
    };

    return weatherIcons[iconCode] || null;
  };
  console.log(weatherData)
  return (
    <WeatherContainer>
      <input
        type="text"
        placeholder="Enter Country/City name"
        value={city}
        onChange={handleChange}
      />
      <button onClick={getWeatherData}>
        <FaSearch /> Get Weather
      </button>

      {weatherData && (
        <WeatherInfo>
          <h2>{weatherData.name}</h2>
          <WeatherIcon>{getWeatherIcon(weatherData.weather[0].icon)}</WeatherIcon>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </WeatherInfo>
      )}
    </WeatherContainer>
  );
};

export default WeatherApp;
