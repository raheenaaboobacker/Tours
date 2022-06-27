import React from 'react'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

function HomeNav() {
  return (
    
        
<Navbar bg="light" expand="lg"style={{minHeight:"80px",marginBottom:"1px"}}>
  <Container>
  <Navbar.Brand href="/">
      <img
        src="assets/img/logo/logo.png"
        width="150"
        height="60"
       marginTop="-5"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="d-flex" style={{fontSize:18,marginLeft:150}}>
        <Nav.Link href="/"><h4>Home</h4></Nav.Link>
        <Nav.Link href="/about"><h4>About Us</h4></Nav.Link>
        <Nav.Link href="/login"><h4>Sign In</h4></Nav.Link>
        <NavDropdown title="Sign up" style={{fontSize:16,marginTop:-3}} id="basic-nav-dropdown">
          <NavDropdown.Item href="/register"><h5>User</h5></NavDropdown.Item>
          <NavDropdown.Item href="/coordinatorRegister"><h5>Coordinator</h5></NavDropdown.Item>
          <NavDropdown.Item href="/resortRegister"><h5>Resort</h5></NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
       
 )
}

export default HomeNav