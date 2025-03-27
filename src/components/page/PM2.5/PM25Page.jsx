import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "./PM25Page.css";

const PM25Page = () => {
  const [pm25Data, setPm25Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };

  const getAqiStatus = (aqi) => {
    if (aqi <= 50) return { text: "ดีมาก", textColor: "#2F855A" }; // สีข้อความ #2F855A สำหรับ Green
    if (aqi <= 100) return { text: "ปานกลาง", textColor: "#D69E2E" }; // สีข้อความ #D69E2E สำหรับ Yellow
    if (aqi <= 150)
      return {
        text: "มีผลต่อสุขภาพ",
        textColor: "#DD6B20",
      }; // สีข้อความ #DD6B20 สำหรับ Orange
    return { text: "อันตราย", textColor: "#C53030" }; // สีข้อความ #C53030 สำหรับ Red
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
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>🗒️ มาตรวัดคุณภาพอากาศ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-2 gap-4">
              <ScaleItem color="bg-green-500" range="0-50" label="ดี" />
              <ScaleItem color="bg-yellow-500" range="51-100" label="ปานกลาง" />
              <ScaleItem
                color="bg-orange-500"
                range="101-150"
                label="มีผลต่อสุขภาพ"
              />
              <ScaleItem color="bg-red-500" range="151+" label="อันตราย" />
            </div>
          </Modal.Body>
        </Modal>
      </div>

      {/* Current AQI Table */}
      {pm25Data && pm25Data.data && (
        <div
          className="card rounded-lg max-w-4xl mx-auto mb-16 col-4"
          style={{
            backgroundColor: "#e6fcff",
            fontFamily: "Mitr, sans-serif",
          }}
        >
          <div className="row">
            <div className="col-6">
              <h2 className="text-2xl font-semibold text-gray-700 my-4 text-start px-4">
                ข้อมูลปัจจุบัน
              </h2>
            </div>
            <div className="col-6 my-4 text-end px-4">
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </div>
          </div>
          <div>
            <div className="space-y-4 text-gray-600 mb-4">
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

                <div className="d-flex align-items-center justify-content-center gap-2 text-center mt-2 ">
                  <span className="fs-5">ดัชนีคุณภาพอากาศ :</span>
                  <div
                    className={` ${
                      getAqiStatus(pm25Data.data.aqi).color
                    }`}
                    style={{ color: getAqiStatus(pm25Data.data.aqi).textColor }}
                  >
                    <span className="fs-5">{getAqiStatus(pm25Data.data.aqi).text}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PM Data Table */}
            <div className="my-5">
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

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
        📅 พยากรณ์ 7 วันข้างหน้า
      </h2>
      {pm25Data?.data?.forecast && (
        <div className="d-flex justify-content-center align-items-center position-relative">
          {/* ปุ่มเลื่อนซ้าย */}
          <button className="btn btn-dark me-2" onClick={scrollLeft}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          {/* ส่วนที่เลื่อนได้ */}
          <div
            ref={scrollRef}
            className="d-flex overflow-hidden col-8 col-md-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {pm25Data.data.forecast.daily.pm25.map((day, index) => {
              const aqiStatus = getAqiStatus(day.avg);
              return (
                <div
                  key={index}
                  className={`card ${aqiStatus.color} m-2`}
                  style={{ minWidth: "200px" }}
                >
                  <h3 className="card-header mb-3 text-center">
                    {formatDate(day.day)}
                  </h3>
                  <div className="card-body text-center">
                    <MetricItem label="ค่าเฉลี่ย" value={`${day.avg} µg/m³`} />
                    <MetricItem label="สูงสุด" value={`${day.max} µg/m³`} />
                    <MetricItem label="ต่ำสุด" value={`${day.min} µg/m³`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button className="btn btn-dark ms-2" onClick={scrollRight}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
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
