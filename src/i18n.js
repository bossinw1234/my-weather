// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// การตั้งค่า i18next
i18n
  .use(initReactI18next) // เชื่อมต่อกับ react-i18next
  .init({
    resources: {
      th: {
        translation: {
          "loading": "กำลังโหลด...",
          "error": "ข้อผิดพลาด: {{message}}",
          "select_district": "เลือกอำเภอที่นี่ !",
          "change_units": "เปลี่ยนเป็น {{unit}}",
          "weather": "สภาพอากาศใน {{city}}, {{country}}",
          "wind": "แรงลม:",
          "humidity": "ความชื้น:",
          "pressure": "ความกดอากาศ:",
          "rain_probability": "โอกาสฝน:",
          "no_data": "ไม่มีข้อมูลการพยากรณ์",
          "districts": {
            "Chiang Mai": "เชียงใหม่",
            "Mae Rim": "แม่ริม",
            "Chom Thong": "จอมทอง",
            "Hang Dong": "หางดง",
            "San Sai": "สันทราย",
            "Doi Saket": "ดอยสะเก็ด",
            "Mae Chaem": "แม่แจ่ม",
            "Chiang Dao": "เชียงดาว",
            "Mae Taeng": "แม่แตง",
            "Samoeng": "สะเมิง",
            "Mae Ai": "แม่อาย",
            "Phrao": "พร้าว",
            "San Pa Tong": "สันป่าตอง",
            "San Kamphaeng": "สันกำแพง",
            "Hot": "ฮอด",
            "Doi Tao": "ดอยเต่า",
            "Omkoi": "ออมก๋อย",
            "Saraphi": "สารภี",
            "Wiang Haeng": "เวียงแหง"
          }
        }
      },
      en: {
        translation: {
          "loading": "Loading...",
          "error": "Error: {{message}}",
          "select_district": "Select District Here!",
          "change_units": "Change to {{unit}}",
          "weather": "Weather in {{city}}, {{country}}",
          "wind": "Wind Speed:",
          "humidity": "Humidity:",
          "pressure": "Pressure:",
          "rain_probability": "Chance of Rain:",
          "no_data": "No forecast data available",
          "districts": {
            "Chiang Mai": "Chiang Mai",
            "Mae Rim": "Mae Rim",
            "Chom Thong": "Chom Thong",
            "Hang Dong": "Hang Dong",
            "San Sai": "San Sai",
            "Doi Saket": "Doi Saket",
            "Mae Chaem": "Mae Chaem",
            "Chiang Dao": "Chiang Dao",
            "Mae Taeng": "Mae Taeng",
            "Samoeng": "Samoeng",
            "Mae Ai": "Mae Ai",
            "Phrao": "Phrao",
            "San Pa Tong": "San Pa Tong",
            "San Kamphaeng": "San Kamphaeng",
            "Hot": "Hot",
            "Doi Tao": "Doi Tao",
            "Omkoi": "Omkoi",
            "Saraphi": "Saraphi",
            "Wiang Haeng": "Wiang Haeng"
          }
        }
      }
    },
    lng: "th", // ภาษาเริ่มต้น
    fallbackLng: "en", // ภาษา fallback ถ้าไม่พบการแปล
    interpolation: {
      escapeValue: false // react ไม่ต้อง escape value
    }
  });

export default i18n;
