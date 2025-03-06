import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import Dropdown from "./Dropdown";
import WeatherDisplay from "./WeatherDisplay";

const districts = [
  { name: "Chiang Mai", value: "Chiang Mai,th" },
  { name: "Mae Rim", value: "Mae Rim,th" },
  { name: "Chom Thong", value: "Chom Thong,th" },
  { name: "Hang Dong", value: "Hang Dong,th" },
  { name: "San Sai", value: "San Sai,th" },
  { name: "Doi Saket", value: "Doi Saket,th" },
  { name: "Mae Chaem", value: "Mae Chaem,th" },
  { name: "Chiang Dao", value: "Chiang Dao,th" },
  { name: "Mae Taeng", value: "Mae Taeng,th" },
  { name: "Samoeng", value: "Samoeng,th" },
  { name: "Mae Ai", value: "Mae Ai,th" },
  { name: "Phrao", value: "Phrao,th" },
  { name: "San Pa Tong", value: "San Pa Tong,th" },
  { name: "San Kamphaeng", value: "San Kamphaeng,th" },
  { name: "Hot", value: "Hot,th" },
  { name: "Doi Tao", value: "Doi Tao,th" },
  { name: "Omkoi", value: "Omkoi,th" },
  { name: "Saraphi", value: "Saraphi,th" },
  { name: "Wiang Haeng", value: "Wiang Haeng,th" },
];

const WeatherWidget = () => {
  const { t, i18n } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(districts[0].value);
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "822aa8da99d4dfbf95501c56def12fcf";

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    )
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      .then((data) => {
        console.log("API Response:", data);
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [city, units]);

  return (
    <div
      className="card mx-auto mt-5"
      style={{
        maxWidth: "20rem",
        backgroundColor: "#8cddee",
        fontFamily: "Mitr, sans-serif",
      }}
    >
      <div className="card-body text-center">
        <h2 className="card-title">{t("select_district")}</h2>
        <Dropdown
          city={city}
          handleCityChange={(e) => setCity(e.target.value)}
          districts={districts}
          t={t}
        />
        <button
          className="btn btn-secondary mt-3 me-2"
          onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
        >
          {t("change_units", { unit: units === "metric" ? "°F" : "°C" })}
        </button>
        <button
          className="btn btn-secondary mt-3"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "th" ? "en" : "th")
          }
        >
          🌍 {i18n.language === "th" ? "English" : "ไทย"}
        </button>
        <div className="card-text mt-4">
          {loading ? (
            <p>{t("loading")}</p>
          ) : error ? (
            <p>{t("error", { message: error.message })}</p>
          ) : (
            <WeatherDisplay weatherData={weatherData} units={units} t={t} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
