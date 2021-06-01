import React from 'react'

const Menu = ({ loggedUser, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  if (!loggedUser) {
    return (
      <div>
        <a href="/" style={padding}>Pääsivu</a>
        <a id="loginform" href="/login" style={padding}>Kirjaudu sisään</a>
        <a id="registerform" href="/register" style={padding}>Rekisteröidy</a>
      </div>
    )
  }

  return (
    <div>
      <a href="/" style={padding}>Pääsivu</a>
      <a id="loginform" href="/login" style={padding} onClick={logout}>Kirjaudu ulos</a>
      <a id="registerform" href="/register" style={padding}>Rekisteröidy</a>
    </div>
  )
}

export default Menu
