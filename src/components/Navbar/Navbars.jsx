import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nbar.css";


function Nbar() {
  const [language, setLanguage] = useState("th");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "th" ? "en" : "th"));
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className="text-white fw-bold">
          {language === "th"
            ? "อากาศเชียงใหม่วันนี้"
            : "Chiang Mai Weather Today"}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <img
            src="/weather.ico"
            alt="Weather icon"
            style={{ width: "30px", height: "30px" }}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link href="#home" className="nav-link">
              {language === "th" ? "หน้าหลัก" : "Home"}
            </Nav.Link>
            <Nav.Link
              href="https://openweathermap.org/city/1153671"
              className="nav-link"
            >
              {language === "th" ? "ที่มาของ API" : "Source of API"}
            </Nav.Link>
            <Nav.Link onClick={toggleLanguage} className="globe-icon">
              🌍
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nbar;
