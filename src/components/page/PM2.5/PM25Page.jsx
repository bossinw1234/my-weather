import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import "./PM25Page.css";

class PM25Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pm25Data: null,
      loading: true,
      error: null,
      showModal: false,
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPM25Data();
  }

  fetchPM25Data = async () => {
    try {
      const response = await fetch(
        `https://api.waqi.info/feed/ChiangMai/?token=ae835fc83e9268ec469b1128d8670456501caa3e`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ pm25Data: data, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ error: "Error fetching data", loading: false });
    }
  };

  scrollLeft = () => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollBy({
        left: -300, // ปรับค่าตามความต้องการ
        behavior: "smooth",
      });
    }
  };

  scrollRight = () => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollBy({
        left: 300, // ปรับค่าตามความต้องการ
        behavior: "smooth",
      });
    }
  };

  getAqiStatus = (aqi) => {
    if (aqi <= 50) return { 
      text: "ดีมาก", 
      textColor: "#2F855A",
      bgColor: "#C6F6D5" // สีเขียวอ่อน
    };
    if (aqi <= 100) return { 
      text: "ปานกลาง", 
      textColor: "#D69E2E",
      bgColor: "#FEFCBF" // สีเหลืองอ่อน
    };
    if (aqi <= 150) return { 
      text: "มีผลต่อสุขภาพ", 
      textColor: "#DD6B20",
      bgColor: "#FEEBC8" // สีส้มอ่อน
    };
    return { 
      text: "อันตราย", 
      textColor: "#C53030",
      bgColor: "#FED7D7" // สีแดงอ่อน
    };
  };
  

  renderContent() {
    const { pm25Data, error, loading } = this.state;

    if (loading)
      return (
        <div className="loading-spinner">
          <Spinner animation="border" variant="info" />
        </div>
      );
    if (error) return <p>{error}</p>;
    if (!pm25Data?.data) return null;

    return (
      <>
        {/* Current AQI Card */}
        <div className="pm25-card">
          {/* Card Header */}
          <div className="row">
            <div className="col-6">
              <h4 className="text-2xl font-semibold text-gray-700 my-4 text-start px-4">
                คุณภาพอากาศเชียงใหม่
              </h4>
            </div>
            <div className="col-6 my-4 text-end px-4">
              <Button
                variant="outline-secondary"
                onClick={() => this.setState({ showModal: true })}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </div>
          </div>

          {/* Card Body */}
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
                    style={{
                      color: this.getAqiStatus(pm25Data.data.aqi).textColor,
                    }}
                  >
                    <span className="fs-5">
                      {this.getAqiStatus(pm25Data.data.aqi).text}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PM Data Table */}
            <div className="my-5">
              <table className="pm25-table mx-auto">
                <thead>
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
                  {[
                    { label: "PM2.5 🌫️", value: pm25Data.data.iaqi.pm25.v },
                    { label: "PM10 💨", value: pm25Data.data.iaqi.pm10.v },
                    { label: "Ozone ☀️", value: pm25Data.data.iaqi.o3.v },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-[#b3e5fc]"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {item.label}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.value} µg/m³
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
          📅 พยากรณ์ 7 วันข้างหน้า
        </h2>
        {pm25Data.data.forecast && (
          <div className="d-flex justify-content-center align-items-center position-relative w-100 my-4">
            <button className="btn btn-dark me-2" onClick={this.scrollLeft}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            <div
              ref={this.scrollRef}
              className="d-flex flex-nowrap col-10 scroll-container"
            >
              {pm25Data.data.forecast.daily.pm25.map((day, index) => (
                <ForecastDay
                  key={index}
                  day={day}
                  getAqiStatus={this.getAqiStatus}
                />
              ))}
            </div>

            <button className="btn btn-dark ms-2" onClick={this.scrollRight}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        )}
      </>
    );
  }

  render() {
    return (
      <div>
        <AirQualityScaleModal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        />
        {this.renderContent()}
      </div>
    );
  }
}

// Helper Components
const AirQualityScaleModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} size="md" centered>
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

const ForecastDay = ({ day, getAqiStatus }) => {
  const aqiStatus = getAqiStatus(day.avg);
  return (
    <div className="forecast-card card">
      <h3 
        className="card-header mb-3 text-center"
        style={{ 
          backgroundColor: aqiStatus.bgColor,
          color: aqiStatus.textColor
        }}
      >
        {formatDate(day.day)}
      </h3>
      <div className="card-body text-center">
        <MetricItem label="ค่าเฉลี่ย" value={`${day.avg} µg/m³`} />
        <MetricItem label="สูงสุด" value={`${day.max} µg/m³`} />
        <MetricItem label="ต่ำสุด" value={`${day.min} µg/m³`} />
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

// Utility function
const formatDate = (dateString) => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("th-TH", options);
};

export default PM25Page;
