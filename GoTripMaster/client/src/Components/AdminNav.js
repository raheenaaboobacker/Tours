import React from 'react'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

function AdminNav() {
    const navigate=useNavigate()
    const logout=()=>
    {
      localStorage.clear();
      window.sessionStorage.clear();
     navigate('/')
    }
    return (
      <Navbar bg="light" expand="lg"style={{minHeight:"80px",marginBottom:"1px"}}>
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
            <Nav.Link href="/admindashboard"><h4>Home</h4></Nav.Link>
            <Nav.Link href="/adminmanageuser"><h4>Users</h4></Nav.Link>
        <Nav.Link href="/adminmanagecordinator"><h4>Coordinator</h4></Nav.Link>
        <Nav.Link href="/adminmanageresort"><h4>Resort</h4></Nav.Link>
        <Nav.Link href="/adminViewFeedback"><h4>FeedBack</h4></Nav.Link>
            <Nav.Link onClick={logout}><h4>Log Out</h4></Nav.Link>
            <NavDropdown title="Booking Details" style={{fontSize:16,marginTop:-3}} id="basic-nav-dropdown">
          <NavDropdown.Item href="/adminViewResortBooking"><h5>Resort</h5></NavDropdown.Item>
          <NavDropdown.Item href="/adminViewPackageBooking"><h5>Packages</h5></NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Payment Details" style={{fontSize:16,marginTop:-3}} id="basic-nav-dropdown">
          <NavDropdown.Item href="/adminViewpaymentresort"><h5>Resort</h5></NavDropdown.Item>
          <NavDropdown.Item href="/adminViewPayment"><h5>Packages</h5></NavDropdown.Item>
        </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNav