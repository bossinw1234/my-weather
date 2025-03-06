const WeatherDisplay = ({ weatherData, units, t }) => {
  console.log("Weather Data:", weatherData);
  console.log("Weather Description:", weatherData?.list?.[0]?.weather?.[0]?.description);

    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
      return <p>{t('no_data')}</p>;
    }
  
    const iconCode = weatherData.list[0]?.weather[0]?.icon;
    console.log("Weather Icon Code:", iconCode);
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
    console.log("Weather Icon URL:", iconUrl);
  
    return (
      <>
        <p className="h3">
          {t('weather', { city: weatherData.city.name, country: weatherData.city.country })}
        </p>
        {iconUrl && <img src={iconUrl} alt="Weather icon" style={{ width: '50px', height: '50px' }} />}
        <p className="h1 font-weight-bold">
          {Math.round(weatherData.list[0].main.temp)}&deg;{units === 'metric' ? 'C' : 'F'}
        </p>
        <p>{weatherData.list[0].weather[0].description}</p>
        <p><strong>{t('wind')}</strong> {weatherData.list[0].wind.speed} {units === 'metric' ? 'm/s' : 'm/h'}</p>
        <p><strong>{t('humidity')}</strong> {weatherData.list[0].main.humidity}%</p>
        <p><strong>{t('pressure')}</strong> {weatherData.list[0].main.pressure} hPa</p>
      </>
    );
  };
  
  export default WeatherDisplay;
  