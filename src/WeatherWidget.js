import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; 

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
  const [units, setUnits] = useState('metric');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '822aa8da99d4dfbf95501c56def12fcf';

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [city, units]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleUnitsChange = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'th' ? 'en' : 'th');
  };

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error', { message: error.message })}</p>;

  const hasForecastData = weatherData && weatherData.list && weatherData.list.length > 0;
  const nextRainForecast = hasForecastData ? weatherData.list.find(item => item.rain && item.rain['3h']) : {};
  const rainProbability = nextRainForecast ? (nextRainForecast.pop * 100).toFixed(0) : 'N/A';

  // ตรวจสอบการมีอยู่ของ icon
  const iconCode = weatherData?.list[0]?.weather[0]?.icon;
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '20rem', backgroundColor: '#f7f4ed', fontFamily: 'Mitr, sans-serif' }}>
      <div className="card-body text-center">
        <h2 className="card-title">{t('select_district')}</h2>
        <select className="form-select mt-3" value={city} onChange={handleCityChange}>
          {districts.map(district => (
            <option key={district.value} value={district.value}>
              {t(`districts.${district.name}`)}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary mt-3" onClick={handleUnitsChange}>
          {t('change_units', { unit: units === 'metric' ? '°F' : '°C' })}
        </button>
        <button className="btn btn-secondary mt-3" onClick={handleLanguageChange}>
          🌍 {i18n.language === 'th' ? 'English' : 'ไทย'}
        </button>
        <div className="card-text mt-4">
          {hasForecastData ? (
            <>
              <p className="h3">
                {t('weather', { city: weatherData.city.name, country: weatherData.city.country })}
              </p>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt="Weather icon"
                  style={{ width: '20px', height: '20px' }} 
                />
              )}
              <p className="h1 font-weight-bold">
                {Math.round(weatherData.list[0].main.temp)}&deg;{units === 'metric' ? 'C' : 'F'}
              </p>
              <p>{weatherData.list[0].weather[0].description}</p>
              <p>
                <strong>{t('wind')}</strong> {weatherData.list[0].wind.speed} {units === 'metric' ? 'm/s' : 'm/h'}
              </p>
              <p>
                <strong>{t('humidity')}</strong> {weatherData.list[0].main.humidity}%
              </p>
              <p>
                <strong>{t('pressure')}</strong> {weatherData.list[0].main.pressure} hPa
              </p>
              <p>
                <strong>{t('rain_probability')}</strong> {rainProbability}%
              </p>
            </>
          ) : (
            <p>{t('no_data')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
