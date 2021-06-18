import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import '../../index.css'

const Menu = ({ loggedUser, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  if (!loggedUser) {
    return (
      <Navbar bg="light" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="palkki">
            <a href="/" style={padding}>Pääsivu</a>
            <a id="registerform" href="/register" style={padding}>Rekisteröidy</a>
            <a id="loginform" href="/login" style={padding}>Kirjaudu sisään</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  return (
    <Navbar bg="light" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="palkki">
          <a href="/" style={padding}>Pääsivu</a>
          <a id="userpage" href={`/${loggedUser}`} style={padding}>Oma sivu</a>
          <a id="settings" href={`/s/${loggedUser}`} style={padding}>Asetukset</a>
          <a id="loginform" href="/login" style={padding} onClick={logout}>Kirjaudu ulos</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
