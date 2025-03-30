import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Nbar.css";

function Nbar() {
  const [language, setLanguage] = useState("th");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "th" ? "en" : "th"));
  };

  return (
    <Navbar expand="lg" className="custom-navbar" collapseOnSelect>
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/" className="nav-logo-cutom">
          <img
            src="/watherlogo.png"
            alt="Logo"
            className="logo-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-logo.png";
            }}
          />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <NavLink to="/" className="nav-link">
              {language === "th" ? "หน้าหลัก" : "Home"}
            </NavLink>
            <NavLink to="/pm25" className="nav-link">
              {language === "th" ? "ค่าฝุ่น" : "PM2.5"}
            </NavLink>
            <NavLink to="/map" className="nav-link">
              {language === "th" ? "แผนที่" : "Map"}
            </NavLink>
            <NavDropdown
              title={language === "th" ? "ที่มาของ API" : "Source of API"}
              id=""
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <NavDropdown.Item href="https://openweathermap.org/city/1153671">
                {language === "th"
                  ? "Open Weather Map APIs"
                  : "Open Weather Map APIs"}
              </NavDropdown.Item>
              <NavDropdown.Item href="https://aqicn.org/api/">
                {language === "th"
                  ? "Air Quality Programmatic APIs"
                  : "Air Quality Programmatic APIs"}
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

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
