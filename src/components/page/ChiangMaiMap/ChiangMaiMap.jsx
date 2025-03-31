import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapStyle.css"; 
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const districts = [
  {
    name: "อำเภอเมืองเชียงใหม่",
    value: "Chiang Mai,th",
    lat: 18.7883,
    lng: 98.9853,
  },
  { name: "อำเภอแม่ริม", value: "Mae Rim,th", lat: 18.9335, lng: 98.8705 },
  { name: "อำเภอจอมทอง", value: "Chom Thong,th", lat: 18.373, lng: 98.6723 },
  { name: "อำเภอหางดง", value: "Hang Dong,th", lat: 18.6873, lng: 98.8936 },
  { name: "อำเภอสันทราย", value: "San Sai,th", lat: 18.8585, lng: 99.0352 },
  { name: "อำเภอดอยสะเก็ด", value: "Doi Saket,th", lat: 18.8497, lng: 99.1195 },
  { name: "อำเภอแม่แจ่ม", value: "Mae Chaem,th", lat: 18.4723, lng: 98.4206 },
  { name: "อำเภอเชียงดาว", value: "Chiang Dao,th", lat: 19.3756, lng: 98.9636 },
  { name: "อำเภอแม่แตง", value: "Mae Taeng,th", lat: 19.175, lng: 98.9269 },
  { name: "อำเภอสะเมิง", value: "Samoeng,th", lat: 18.8939, lng: 98.6672 },
  { name: "อำเภอแม่วาง", value: "Mae Wang,th", lat: 18.7189, lng: 98.7333 },
  { name: "อำเภอแม่อาย", value: "Mae Ai,th", lat: 19.6812, lng: 99.2215 },
  { name: "อำเภอพร้าว", value: "Phrao,th", lat: 19.3667, lng: 99.2167 },
  { name: "อำเภอสันป่าตอง", value: "San Pa Tong,th", lat: 18.6497, lng: 98.888 },
  {
    name: "อำเภอสันกำแพง",
    value: "San Kamphaeng,th",
    lat: 18.7288,
    lng: 99.1255,
  },
  { name: "อำเภอฮอด", value: "Hot,th", lat: 18.1862, lng: 98.6548 },
  { name: "อำเภอดอยเต่า", value: "Doi Tao,th", lat: 17.9035, lng: 98.6795 },
  { name: "อำเภออมก๋อย", value: "Omkoi,th", lat: 17.8083, lng: 98.3989 },
  { name: "อำเภอสารภี", value: "Saraphi,th", lat: 18.7294, lng: 99.0283 },
  { name: "อำเภอเวียงแหง", value: "Wiang Haeng,th", lat: 19.5975, lng: 98.678 },
  { name: "อำเภอดอยหล่อ", value: "Doi Lo,th", lat: 18.55, lng: 98.85 },
  { name: "อำเภอไชยปราการ", value: "Chai Prakan,th", lat: 19.6167, lng: 99.15 },
  { name: "อำเภอฝาง", value: "Fang,th", lat: 19.9211, lng: 99.2158 },
  {
    name: "อำเภอกัลยาณิวัฒนา",
    value: "Galyani Vadhana,th",
    lat: 18.4803,
    lng: 98.4521,
  },
];

const API_KEY = "822aa8da99d4dfbf95501c56def12fcf";

const ResetMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([coords.lat, coords.lng], coords.zoom);
  }, [coords, map]);
  return null;
};
const ChiangMaiMap = () => {
  const [resetPosition, setResetPosition] = useState({
    lat: 18.7883,
    lng: 98.9853,
    zoom: 12
  });
  const handleResetMap = () => {
    setResetPosition(prev => ({
      ...prev,
      lat: 18.7883,
      lng: 98.9853,
      zoom: 12
    }));
  };
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = {};
      for (const district of districts) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${district.value}&appid=${API_KEY}&units=metric`
          );
          const result = await response.json();
          console.log(result);
          data[district.value] = result;
        } catch (error) {
          console.error(`Error fetching weather for ${district.name}:`, error);
          data[district.value] = { error: "Unable to fetch data" };
        }
      }
      setWeatherData(data);
      setLoading(false);
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "🌤️";
  };

  return (
    <div className="map-container">
      <h1 className="map-title ">แผนที่สภาพอากาศจังหวัดเชียงใหม่</h1>

      <button 
        className="reset-button"
        onClick={handleResetMap}
      >
        ↻ กลับไปจุดเริ่มต้น
      </button>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        <MapContainer
            center={[18.7883, 98.9853]}
            zoom={12}
            style={{
              height: '50%',
              width: '50%',
              zIndex: 1,
            }}
            zoomControl={false}
          ><ResetMapView coords={resetPosition} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {districts.map((district) => {
            const weather = weatherData[district.value];
            return (
              <Marker
                key={district.value}
                position={[district.lat, district.lng]}
              >
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -10]}
                  className="custom-tooltip"
                >
                  <div className="tooltip-content">
                    <h4>{district.name}</h4>
                    {weather?.error ? (
                      <p>❌ ข้อมูลผิดพลาด</p>
                    ) : (
                      <>
                        <div className="weather-row">
                          <span className="weather-icon">
                            {getWeatherIcon(weather?.weather?.[0]?.id)}
                          </span>
                          <span className="temperature">
                            {Math.round(weather?.main?.temp)}°C
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default ChiangMaiMap;
