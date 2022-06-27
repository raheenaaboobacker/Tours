import React from 'react'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

function ResortNav() {
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
            <Nav.Link href="/resortDashboard"><h5>Home</h5></Nav.Link>
            <Nav.Link href="/resorts"><h5>Resort</h5></Nav.Link>
            <Nav.Link href="/resortmanagecordinator"><h5>Coordinators</h5></Nav.Link>
            <Nav.Link href="/resortViewPayment"><h5>Payment</h5></Nav.Link>
            {/* <Nav.Link href="/about"><h5>About Us</h5></Nav.Link> */}
            <Nav.Link onClick={logout}><h5>Log Out</h5></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default ResortNav