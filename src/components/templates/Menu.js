import React from 'react'

const Menu = ({ logout }) => {
  const padding = {
    paddingRight: 5,
  }

  if (!localStorage.getItem('user-token')) {
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
      <a id="userpage" href="/userpage" style={padding}>Oma sivu</a>
      <a id="loginform" href="/login" style={padding} onClick={logout}>Kirjaudu ulos</a>
    </div>

  )
}

export default Menu
