import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navbarStyle = {
  backgroundColor: 'rgb(52, 58, 64)',  // สีที่ต้องการ
};

const linkStyle = {
  color: 'rgb(255, 255, 255)', // สีข้อความเป็นสีขาว
};


function Nbar() {
  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="#home" style={linkStyle}>อากาศเชียงใหม่วันนี้</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={linkStyle}>หน้าหลัก</Nav.Link>
            <Nav.Link href="https://openweathermap.org/city/1153671" style={linkStyle}>ที่มาของAPI</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nbar;
