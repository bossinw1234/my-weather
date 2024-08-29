import React, { useState, useEffect } from 'react';

const districts = [
    { name: "Chiang Mai", value: "Chiang Mai,th" },
    { name: "Mae Rim", value: "Mae Rim,th" },
    { name: "Chom Thong", value: "Chom Thong,th" },
    { name: "Hang Dong", value: "Hang Dong,th" },
    { name: "San Sai", value: "San Sai,th" },
    { name: "Doi Saket", value: "Doi Saket,th" },
    // เพิ่มอำเภอที่คุณต้องการเพิ่มเติมได้ที่นี่
];

const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(districts[0].value);
    const [units, setUnits] = useState('metric');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = '822aa8da99d4dfbf95501c56def12fcf'; // ใส่ API Key ของคุณที่นี่

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // ตรวจสอบการมีอยู่ของ weatherData และ list ก่อนใช้
    const hasForecastData = weatherData && weatherData.list && weatherData.list.length > 0;
    const nextRainForecast = hasForecastData ? weatherData.list.find(item => item.rain && item.rain['3h']) : {};
    const rainProbability = nextRainForecast ? (nextRainForecast.pop * 100).toFixed(0) : 'N/A'; // เปอร์เซ็นต์ความเป็นไปได้ในการตกฝน

    return (
        <div className="card mx-auto mt-5" style={{ maxWidth: '20rem' }}>
            <div className="card-body text-center">
                <h2 className="card-title">สภาพอากาศในเชียงใหม่</h2>
                <select className="form-select mt-3" value={city} onChange={handleCityChange}>
                    {districts.map(district => (
                        <option key={district.value} value={district.value}>
                            {district.name}
                        </option>
                    ))}
                </select>
                <button className="btn btn-secondary mt-3" onClick={handleUnitsChange}>
                    Change to {units === 'metric' ? 'Imperial' : 'Metric'}
                </button>
                <div className="card-text mt-4">
                    {hasForecastData ? (
                        <>
                            <p className="h3">
                                สภาพอากาศใน <strong>{weatherData.city.name}</strong>, {weatherData.city.country}
                            </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                                alt="Weather icon"
                            />
                            <p className="h1 font-weight-bold">
                                {Math.round(weatherData.list[0].main.temp)}&deg;{units === 'metric' ? 'C' : 'F'}
                            </p>
                            <p>{weatherData.list[0].weather[0].description}</p>
                            <p>
                                <strong>แรงลม:</strong> {weatherData.list[0].wind.speed} {units === 'metric' ? 'm/s' : 'm/h'}
                            </p>
                            <p>
                                <strong>ความชื้น:</strong> {weatherData.list[0].main.humidity}%
                            </p>
                            <p>
                                <strong>ความกดอากาศ:</strong> {weatherData.list[0].main.pressure} hPa
                            </p>
                            <p>
                                <strong>โอกาสฝน:</strong> {rainProbability}%
                            </p>
                        </>
                    ) : (
                        <p>No forecast data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
