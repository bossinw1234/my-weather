import { col } from "framer-motion/client";
import React, { useEffect, useState } from "react";

const PM25Page = () => {
  const [pm25Data, setPm25Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPM25Data = async () => {
      try {
        const response = await fetch(
          `https://api.waqi.info/feed/ChiangMai/?token=ae835fc83e9268ec469b1128d8670456501caa3e`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPm25Data(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchPM25Data();
  }, []);

  const getAqiStatus = (aqi) => {
    if (aqi <= 50) return { text: "ดีมาก", color: "bg-green-500" };
    if (aqi <= 100) return { text: "ปานกลาง", color: "bg-yellow-500" };
    if (aqi <= 150) return { text: "มีผลต่อสุขภาพ", color: "bg-orange-500" };
    return { text: "อันตราย", color: "bg-red-500" };
  };

  if (loading) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🏔️ คุณภาพอากาศเชียงใหม่
        </h1>
      </div>

      {/* Current AQI Table */}
      {pm25Data && pm25Data.data && (
        <div
          className="card rounded-lg max-w-4xl mx-auto mb-16 col-4"
          style={{
            backgroundColor: "#8cddee",
            fontFamily: "Mitr, sans-serif",
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            ข้อมูลปัจจุบัน
          </h2>
          <div>
            <div className="space-y-4 text-gray-600 mb-6">
              <p>
                📍 <strong>สถานีตรวจวัด:</strong>{" "}
                <span className="font-medium">{pm25Data.data.city.name}</span>
              </p>
              <p>
                🌡️ <strong>อุณหภูมิ:</strong>{" "}
                <span className="font-medium">{pm25Data.data.iaqi.t.v} °C</span>
              </p>
            </div>

            {/* AQI Status */}
            <div className="text-center mb-6">
              <div>
                <span className="text-sm">คุณภาพอากาศเชียงใหม่ : </span>
                <span className="text-4xl font-bold mb-2">
                  {pm25Data.data.aqi}
                </span>

                <p className="mt-4 text-lg font-medium text-gray-700">
                  {getAqiStatus(pm25Data.data.aqi).text}
                </p>
              </div>
            </div>

            {/* PM Data Table */}
            <div>
              <table className="mx-auto border-collapse border border-gray-300 bg-[#8cddee]">
                <thead className="bg-[#74c1d8]">
                  <tr className="border-b-2 border-gray-300">
                    <th className="px-4 py-2 text-left border border-gray-300">
                      ประเภท
                    </th>
                    <th className="px-4 py-2 text-left border border-gray-300">
                      ค่าฝุ่น (µg/m³)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-[#b3e5fc]">
                    <td className="px-4 py-2 border border-gray-300">
                      PM2.5 🌫️
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pm25Data.data.iaqi.pm25.v} µg/m³
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-[#b3e5fc]">
                    <td className="px-4 py-2 border border-gray-300">
                      PM10 💨
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pm25Data.data.iaqi.pm10.v} µg/m³
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-[#b3e5fc]">
                    <td className="px-4 py-2 border border-gray-300">
                      Ozone ☀️
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {pm25Data.data.iaqi.o3.v} µg/m³
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {pm25Data?.data?.forecast && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            📅 พยากรณ์ 7 วันข้างหน้า
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pm25Data.data.forecast.daily.pm25.map((day, index) => {
              const aqiStatus = getAqiStatus(day.avg);
              return (
                <div
                  key={index}
                  className={`relative rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ${aqiStatus.color}`}
                >
                  <h3 className="text-lg font-semibold text-white mb-3 text-center">
                    {formatDate(day.day)}
                  </h3>
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <MetricItem label="ค่าเฉลี่ย" value={`${day.avg} µg/m³`} />
                    <MetricItem label="สูงสุด" value={`${day.max} µg/m³`} />
                    <MetricItem label="ต่ำสุด" value={`${day.min} µg/m³`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AQI Scale Legend */}
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">🗒️ มาตรวัดคุณภาพอากาศ</h3>
        <div className="flex flex-col space-y-3">
          <ScaleItem color="bg-green-500" range="0-50" label="ดี" />
          <ScaleItem color="bg-yellow-500" range="51-100" label="ปานกลาง" />
          <ScaleItem
            color="bg-orange-500"
            range="101-150"
            label="มีผลต่อสุขภาพ"
          />
          <ScaleItem color="bg-red-500" range="151+" label="อันตราย" />
        </div>
      </div>
    </div>
  );
};


const MetricItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

const ScaleItem = ({ color, range, label }) => (
  <div className="flex items-center space-x-3">
    <div className={`${color} w-8 h-8 rounded-full`} />
    <div>
      <span className="font-medium">{range}</span>
      <span className="text-gray-600 ml-2">{label}</span>
    </div>
  </div>
);

// Date formatter
const formatDate = (dateString) => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("th-TH", options);
};

export default PM25Page;
