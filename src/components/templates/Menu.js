import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import '../../index.css'

const Menu = ({ loggedUser, logout }) => {
  if (!loggedUser) {
    return (
      <Navbar className="navbar-custom">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="palkki">
            <a className="menuLink" href="/">Pääsivu</a>
            <a className="menuLink" id="registerform" href="/register">Rekisteröidy</a>
            <a className="menuLink" id="loginform" href="/login">Kirjaudu sisään</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  return (
    <Navbar className="navbar-custom">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="palkki">
          <a className="menuLink" href="/">Pääsivu</a>
          <a className="menuLink" id="userpage" href={`/${loggedUser}`}>Oma sivu</a>
          <a className="menuLink" id="settings" href={`/s/${loggedUser}`}>Asetukset</a>
          <a className="menuLink" id="loginform" href="/login" onClick={logout}>Kirjaudu ulos</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
