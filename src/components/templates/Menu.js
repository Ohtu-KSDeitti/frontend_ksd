import React from 'react'

const Menu = ({ loggedUser, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  if (loggedUser === undefined) {
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

export default Menu
