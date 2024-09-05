import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navbarStyle = {
  backgroundColor: 'rgb(52,206,226)',  
  fontFamily: 'Mitr, sans-serif' 
};

const linkStyle = {
  color: 'rgb(255, 255, 255)', 
  fontFamily: 'Mitr, sans-serif', 
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center'
};

const globeIconStyle = {
  color: 'rgb(255, 255, 255)', 
  fontSize: '20px',
  marginRight: '10px',
  cursor: 'pointer' // ทำให้ไอคอนคลิกได้
};

function Nbar() {
  const [language, setLanguage] = useState('th'); // ตั้งค่าเริ่มต้นเป็นภาษาไทย

  // ฟังก์ชันเปลี่ยนภาษา
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'th' ? 'en' : 'th')); // สลับระหว่างไทยและอังกฤษ
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="#home" style={linkStyle}>
          {language === 'th' ? 'อากาศเชียงใหม่วันนี้' : 'Chiang Mai Weather Today'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#home" style={linkStyle}>
              {language === 'th' ? 'หน้าหลัก' : 'Home'}
            </Nav.Link>
            <Nav.Link href="https://openweathermap.org/city/1153671" style={linkStyle}>
              {language === 'th' ? 'ที่มาของ API' : 'Source of API'}
            </Nav.Link>
            {/* เมื่อกดไอคอน 🌍 จะเรียกใช้ฟังก์ชัน toggleLanguage */}
            <Nav.Link style={globeIconStyle} onClick={toggleLanguage}>🌍</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nbar;
