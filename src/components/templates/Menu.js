import React from 'react'

const Menu = ({ loggedUser, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  if (!localStorage.getItem('user-token')) {
    return (
      <div>
        <a href="/" style={padding}>Pääsivu</a>
        <a id="loginform" href="/login" style={padding}>Kirjaudu sisään</a>
      </div>
    )
  }
  return (
    <div>
      <a href="/" style={padding}>Pääsivu</a>
      <a id="userpage" href={loggedUser} style={padding}>Oma sivu</a>
      <a id="logout" href="/" style={padding} onClick={logout}>Kirjaudu ulos</a>
    </div>

  )
}

export default Menu
