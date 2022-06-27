import React from 'react'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

function UserNav() {
  const navigate=useNavigate()
  const logout=()=>
  {
    localStorage.clear();
    window.sessionStorage.clear();
   navigate('/')
  }
  return (
    <Navbar bg="light" expand="lg" style={{minHeight:"80px",marginBottom:"1px"}}>
    <Container>
    <Navbar.Brand href="/">
        <img
          src="assets/img/logo/logo.png"
          width="150"
          height="60"
         
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex" style={{fontSize:18,marginLeft:150}}>
          <Nav.Link href="/userdashboard"><h4>Home</h4></Nav.Link>
          <Nav.Link href="/userviewresort"><h4>Resorts</h4></Nav.Link>
          {/* <Nav.Link href="/about"><h4>About Us</h4></Nav.Link> */}
          <Nav.Link href="/contact"><h4>Contact Us</h4></Nav.Link>
          <Nav.Link onClick={logout}><h4>Logout</h4></Nav.Link>
          <NavDropdown title="Booking Details" style={{fontSize:16,marginTop:-3}} id="basic-nav-dropdown">
          <NavDropdown.Item href="/userShowBookedResort"><h5>Resort</h5></NavDropdown.Item>
          <NavDropdown.Item href="/userShowBookedPackage"><h5>Packages</h5></NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default UserNav
