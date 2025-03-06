import { motion } from "framer-motion";

const WeatherDisplay = ({ weatherData, units, t }) => {
  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <p>{t('no_data')}</p>;
  }

  const iconCode = weatherData.list[0]?.weather[0]?.icon;
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

  return (
    <>
      <p className="h3">
        {t('weather', { city: weatherData.city.name, country: weatherData.city.country })}
      </p>

      {iconUrl && (
        <motion.img
        src={iconUrl}
        alt="Weather icon"
        style={{ width: '100px', height: '100px' }}
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: [0, -10, 0], 
        }}
        transition={{
          duration: 1,  
          ease: "easeInOut",
        }}
      />
      
      )}

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
