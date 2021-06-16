import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../index.css'

const Menu = ({ loggedUser }) => {
  const padding = {
    paddingRight: 5,
  }
  if (!loggedUser) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="palkki">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Pääsivu</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/register">Rekisteröidy</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/login">Kirjaudu sisään</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="palkki">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Pääsivu</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to={`/${loggedUser}`}>Oma sivu</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/login">Asetukset</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/login">Kirjaudu ulos</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

/*
  if (!loggedUser) {
    return (
      <div>
        <a href="/" style={padding}>Pääsivu</a>
        <a id="registerform" href="/register" style={padding}>Rekisteröidy</a>
        <a id="loginform" href="/login" style={padding}>Kirjaudu sisään</a>
      </div>
    )
  }
  return (
    <div>
      <a href="/" style={padding}>Pääsivu</a>
      <a id="userpage" href={`/${loggedUser}`} style={padding}>Oma sivu</a>
      <a id="settings" href={`/s/${loggedUser}`} style={padding}>Asetukset</a>
      <a id="loginform" href="/login" style={padding} onClick={logout}>Kirjaudu ulos</a>
    </div>

  )
}
*/

export default Menu
